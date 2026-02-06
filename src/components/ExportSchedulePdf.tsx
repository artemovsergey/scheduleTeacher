// ExportSchedulePDF.tsx
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import type ScheduleTeacher from '../models/schedule';

// Расписание пар для разных дней недели
const PAIR_SCHEDULES: Record<number, Array<{ start: string, end: string }>> = {
    1: [
        { start: "08:30", end: "10:00" },
        { start: "10:10", end: "11:40" },
        { start: "12:00", end: "13:30" },
        { start: "13:40", end: "15:10" },
        { start: "15:20", end: "16:50" },
        { start: "17:00", end: "18:30" },
        { start: "18:40", end: "20:10" }
    ],
    2: [
        { start: "09:00", end: "10:30" },
        { start: "10:40", end: "12:10" },
        { start: "12:30", end: "14:00" },
        { start: "14:10", end: "15:40" },
        { start: "15:50", end: "17:20" },
        { start: "17:30", end: "19:00" },
        { start: "19:10", end: "20:40" }
    ],
    3: [
        { start: "09:00", end: "10:30" },
        { start: "10:40", end: "12:10" },
        { start: "12:30", end: "14:00" },
        { start: "14:10", end: "15:40" },
        { start: "15:50", end: "17:20" },
        { start: "17:30", end: "19:00" },
        { start: "19:10", end: "20:40" }
    ],
    4: [
        { start: "08:00", end: "09:30" },
        { start: "09:40", end: "11:10" },
        { start: "11:30", end: "13:00" },
        { start: "13:10", end: "14:40" },
        { start: "14:50", end: "16:20" },
        { start: "16:30", end: "18:00" },
        { start: "18:10", end: "19:40" }
    ],
    5: [
        { start: "09:00", end: "10:30" },
        { start: "10:40", end: "12:10" },
        { start: "12:30", end: "14:00" },
        { start: "14:10", end: "15:40" },
        { start: "15:50", end: "17:20" },
        { start: "17:30", end: "19:00" },
        { start: "19:10", end: "20:40" }
    ]
};

const DAY_NAMES = ["Пн", "Вт", "Ср", "Чт", "Пт"];

export const exportScheduleToPDF = async (
    schedules: ScheduleTeacher[],
    weekNumber: number,
    teacherName: string = "Преподаватель"
) => {
    // Создаём временный контейнер для генерации
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.left = '-9999px';
    container.style.top = '-9999px';
    container.style.width = '1200px';
    container.style.backgroundColor = 'white';
    container.style.padding = '40px';
    container.style.fontFamily = 'Arial, sans-serif';

    // Создаём содержимое для экспорта
    container.innerHTML = generateScheduleHTML(schedules, weekNumber, teacherName);

    document.body.appendChild(container);

    try {
        // Делаем скриншот контейнера
        const canvas = await html2canvas(container, {
            scale: 2,
            useCORS: true,
            logging: false,
            backgroundColor: '#ffffff'
        });

        // Создаём PDF
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: 'a4'
        });

        const imgWidth = 297; // A4 landscape width
        const pageHeight = 210; // A4 landscape height
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }

        // Скачиваем файл
        pdf.save(`Расписание_${teacherName}_Неделя_${weekNumber}.pdf`);
    } catch (error) {
        console.error('Ошибка при экспорте в PDF:', error);
        alert('Ошибка при создании PDF. Попробуйте ещё раз.');
    } finally {
        // Удаляем временный контейнер
        document.body.removeChild(container);
    }
};

const generateScheduleHTML = (
    schedules: ScheduleTeacher[],
    weekNumber: number,
    teacherName: string
): string => {
    // Группируем пары по дням недели
    const scheduleByDay: Record<number, ScheduleTeacher[]> = {};

    schedules.forEach(schedule => {
        if (schedule.weeks.includes(weekNumber)) {
            if (!scheduleByDay[schedule.weekDay]) {
                scheduleByDay[schedule.weekDay] = [];
            }
            scheduleByDay[schedule.weekDay].push(schedule);
        }
    });

    // Создаём сетку расписания
    let html = `
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      .schedule-container {
        width: 100%;
        max-width: 1120px;
        margin: 0 auto;
      }
      
      .header {
        text-align: center;
        margin-bottom: 30px;
        border-bottom: 3px solid #4f46e5;
        padding-bottom: 20px;
      }
      
      .header h1 {
        font-size: 24px;
        font-weight: bold;
        color: #1e293b;
        margin-bottom: 8px;
      }
      
      .header .subtitle {
        font-size: 16px;
        color: #64748b;
        margin-top: 4px;
      }
      
      .schedule-grid {
        display: grid;
        grid-template-columns: 120px repeat(5, 1fr);
        gap: 2px;
        width: 100%;
      }
      
      .grid-header {
        background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
        color: white;
        font-weight: bold;
        text-align: center;
        padding: 12px 8px;
        font-size: 13px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .time-cell {
        background: #f1f5f9;
        font-weight: bold;
        text-align: center;
        padding: 10px 8px;
        font-size: 12px;
        color: #475569;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .pair-cell {
        background: white;
        border: 1px solid #e2e8f0;
        padding: 8px;
        font-size: 11px;
        min-height: 80px;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
      
      .pair-cell.empty {
        background: #f8fafc;
        border-style: dashed;
      }
      
      .pair-number {
        display: inline-block;
        width: 20px;
        height: 20px;
        background: #4f46e5;
        color: white;
        border-radius: 50%;
        font-size: 10px;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 6px;
      }
      
      .pair-content {
        font-weight: 600;
        color: #1e293b;
        margin-bottom: 4px;
        line-height: 1.3;
      }
      
      .pair-group {
        font-size: 10px;
        color: #64748b;
        margin-bottom: 2px;
      }
      
      .pair-time {
        font-size: 9px;
        color: #94a3b8;
        margin-top: 4px;
      }
      
      .pair-audience {
        font-size: 9px;
        color: #0ea5e9;
        margin-top: 2px;
      }
      
      .footer {
        margin-top: 30px;
        text-align: center;
        font-size: 11px;
        color: #94a3b8;
        border-top: 1px solid #e2e8f0;
        padding-top: 15px;
      }
      
      @media print {
        .schedule-grid {
          page-break-inside: avoid;
        }
      }
    </style>
    
    <div class="schedule-container">
      <div class="header">
        <h1>РАСПИСАНИЕ ЗАНЯТИЙ</h1>
        <div class="subtitle">${teacherName}</div>
        <div class="subtitle" style="font-size: 14px; margin-top: 8px;">
          Учебная неделя №${weekNumber} | ${getWeekDates(weekNumber)}
        </div>
      </div>
      
      <div class="schedule-grid">
        <!-- Заголовки -->
        <div class="grid-header">Время</div>
        ${DAY_NAMES.map(day => `<div class="grid-header">${day}</div>`).join('')}
        
        <!-- Пары -->
        ${Array.from({ length: 7 }, (_, i) => i + 1).map(pairNum => {
        const pairRow = `
            <div class="time-cell">
              <div>${pairNum}</div>
              <div style="font-size: 10px; margin-top: 2px;">
                ${PAIR_SCHEDULES[1][pairNum - 1].start}–${PAIR_SCHEDULES[1][pairNum - 1].end}
              </div>
            </div>
            ${DAY_NAMES.map((_, dayIndex) => {
            const dayNum = dayIndex + 1;
            const pairs = scheduleByDay[dayNum] || [];
            const pair = pairs.find(p => p.numberPair === pairNum);

            if (pair) {
                const pairTime = PAIR_SCHEDULES[dayNum][pairNum - 1];
                return `
                  <div class="pair-cell">
                    <div style="display: flex; align-items: center; margin-bottom: 4px;">
                      <div class="pair-number">${pair.numberPair}</div>
                      <div class="pair-content">${escapeHtml(pair.subject)}</div>
                    </div>
                    <div class="pair-group">${escapeHtml(pair.group)}</div>
                      
                    <div class="pair-time">${pairTime.start}–${pairTime.end}</div>
                  </div>
                `;
            } else {
                return `<div class="pair-cell empty"></div>`;
            }
        }).join('')}
          `;
        return pairRow;
    }).join('')}
      </div>
      
      <div class="footer">
        Сгенерировано: ${new Date().toLocaleDateString('ru-RU')} | Расписание для печати
      </div>
    </div>
  `;

    return html;
};

const getWeekDates = (weekNumber: number): string => {
    const baseDate = new Date(2026, 0, 12);
    const startDate = new Date(baseDate);
    startDate.setDate(startDate.getDate() + (weekNumber - 1) * 7);

    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 4);

    const format = (date: Date): string => {
        return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}`;
    };

    return `${format(startDate)} - ${format(endDate)}`;
};

const escapeHtml = (text: string): string => {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
};