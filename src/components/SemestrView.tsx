// SemesterView.tsx - Интуитивная календарная таблица всего семестра
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import type ScheduleTeacher from "../models/schedule";
import React from "react";

export default function SemesterView({ schedules }: { schedules: ScheduleTeacher[] }) {
  const navigate = useNavigate();
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const [currentDate, setCurrentDate] = useState({ week: 1, day: 1 });
  const [highlightedCell, setHighlightedCell] = useState<{ week: number, day: number } | null>(null);

  useEffect(() => {
    const today = new Date();
    const baseDate = new Date(2026, 0, 12);
    const diffTime = today.getTime() - baseDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const week = Math.min(Math.max(1, Math.floor(diffDays / 7) + 1), 22);
    const day = (today.getDay() === 0 ? 7 : today.getDay());
    const normalizedDay = day > 5 ? 1 : day;

    setCurrentDate({ week, day: normalizedDay });

    // Плавная прокрутка к текущей неделе
    setTimeout(() => {
      if (tableContainerRef.current) {
        const currentWeekRow = tableContainerRef.current.querySelector(`[data-week-row="${week}"]`);
        if (currentWeekRow) {
          const containerRect = tableContainerRef.current.getBoundingClientRect();
          const rowRect = currentWeekRow.getBoundingClientRect();
          const scrollTop = tableContainerRef.current.scrollTop + (rowRect.top - containerRect.top - containerRect.height / 3);

          tableContainerRef.current.scrollTo({
            top: scrollTop,
            behavior: 'smooth'
          });
        }
      }
    }, 400);
  }, []);

  // Генерация данных для таблицы
  const generateSemesterData = () => {
    const weeks = [];
    const baseDate = new Date(2026, 0, 12);
    const dayNames = ["Пн", "Вт", "Ср", "Чт", "Пт"];

    for (let weekNumber = 1; weekNumber <= 22; weekNumber++) {
      const weekStart = new Date(baseDate);
      weekStart.setDate(weekStart.getDate() + (weekNumber - 1) * 7);

      const days = [];
      for (let dayIndex = 1; dayIndex <= 5; dayIndex++) {
        const date = new Date(weekStart);
        date.setDate(date.getDate() + (dayIndex - 1));

        // Проверяем пары в этот день (БЕЗ ограничения количества)
        const pairs = schedules.filter(s =>
          s.weekDay === dayIndex && s.weeks.includes(weekNumber)
        );

        const isToday = weekNumber === currentDate.week && dayIndex === currentDate.day;
        const dayOfMonth = date.getDate();

        days.push({
          date: formatDate(date),
          dayIndex,
          dayName: dayNames[dayIndex - 1],
          dayOfMonth,
          hasPairs: pairs.length > 0,
          pairs, // Все пары без ограничения
          pairCount: pairs.length,
          isToday,
          month: date.getMonth()
        });
      }

      weeks.push({
        weekNumber,
        startDate: formatDate(weekStart),
        endDate: formatDate(new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + 4)),
        days,
        month: weekStart.getMonth()
      });
    }

    return weeks;
  };

  const formatDate = (date: Date): string => {
    return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}`;
  };

  const handleWeekClick = (weekNumber: number) => {
    localStorage.setItem('selectedWeek', weekNumber.toString());
    navigate('/');
  };

  const handleDayHover = (week: number, day: number) => {
    setHighlightedCell({ week, day });
  };

  const handleDayLeave = () => {
    setHighlightedCell(null);
  };

  const jumpToCurrentWeek = () => {
    if (tableContainerRef.current) {
      const currentWeekRow = tableContainerRef.current.querySelector(`[data-week-row="${currentDate.week}"]`);
      if (currentWeekRow) {
        const containerRect = tableContainerRef.current.getBoundingClientRect();
        const rowRect = currentWeekRow.getBoundingClientRect();
        const scrollTop = tableContainerRef.current.scrollTop + (rowRect.top - containerRect.top - containerRect.height / 3);

        tableContainerRef.current.scrollTo({
          top: scrollTop,
          behavior: 'smooth'
        });
      }
    }
  };

  const semesterData = generateSemesterData();
  const months = ["Янв", "Фев", "Мар", "Апр", "Май", "Июн"];

  // Группируем недели по месяцам для отображения заголовков месяцев
  const weeksByMonth = semesterData.reduce((acc, week) => {
    if (!acc[week.month]) acc[week.month] = [];
    acc[week.month].push(week);
    return acc;
  }, {} as Record<number, typeof semesterData>);

  return (
    <div className="space-y-4">
      {/* Jump to Current Week */}
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl shadow-sm border border-indigo-100 overflow-hidden">
        <button
          onClick={jumpToCurrentWeek}
          className="w-full px-4 py-3 flex items-center justify-center space-x-2 text-indigo-800 font-medium hover:bg-indigo-100 transition-colors"
        >
          <div className="bg-indigo-100 p-1.5 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span className="font-semibold">Текущая неделя: {currentDate.week}</span>
        </button>
      </div>

      {/* Semester Calendar Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="border-b border-slate-200 bg-gradient-to-r from-slate-50 to-indigo-50 px-4 py-3">
          <h2 className="font-bold text-lg text-slate-800 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Календарь семестра 2026
          </h2>
          <p className="text-xs text-slate-600 mt-1">Учебный период: 12 января — 31 мая (22 недели)</p>
        </div>

        <div
          ref={tableContainerRef}
          className="overflow-x-auto max-h-[calc(100vh-220px)] scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100"
        >
          <div className="min-w-[800px]">
            <table className="w-full table-auto text-sm border-collapse">
              <thead className="bg-slate-50 sticky top-0 z-20 shadow-sm">
                <tr>
                  <th className="sticky left-0 z-30 bg-slate-50 p-3 border-b border-r border-slate-200 font-medium text-slate-700 w-32 min-w-[120px]">
                    <div className="flex flex-col items-start">
                      <span className="font-bold text-xs">Учебная</span>
                      <span className="font-bold">неделя</span>
                    </div>
                  </th>
                  {[1, 2, 3, 4, 5].map(dayIndex => {
                    const dayNames = ["Пн", "Вт", "Ср", "Чт", "Пт"];
                    return (
                      <th key={dayIndex} className="p-3 border-b border-slate-200 font-medium text-slate-700 text-center min-w-[140px]">
                        <div className="flex flex-col items-center">
                          <span className="font-bold text-indigo-700">{dayNames[dayIndex - 1]}</span>
                          <span className="text-[0.65rem] text-slate-500 mt-0.5">День недели</span>
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {Object.entries(weeksByMonth).map(([monthIndex, weeks]) => (
                  <React.Fragment key={monthIndex}>
                    {/* Month Header Row */}
                    <tr className="bg-gradient-to-r from-slate-100 to-indigo-50">
                      <td colSpan={6} className="px-4 py-2 font-bold text-slate-800 border-b border-slate-300">
                        <div className="flex items-center">
                          <div className="w-2 h-2 rounded-full bg-indigo-600 mr-2"></div>
                          {months[parseInt(monthIndex)]} {Object.keys(weeksByMonth).indexOf(monthIndex) === 0 ? '2026' : ''}
                        </div>
                      </td>
                    </tr>

                    {/* Weeks in Month */}
                    {weeks.map(week => (
                      <tr
                        key={week.weekNumber}
                        data-week-row={week.weekNumber}
                        onClick={() => handleWeekClick(week.weekNumber)}
                        onMouseEnter={() => setHighlightedCell(prev => prev?.week === week.weekNumber ? prev : null)}
                        className={`border-b border-slate-100 transition-colors ${highlightedCell?.week === week.weekNumber || week.weekNumber === currentDate.week
                          ? 'bg-indigo-50/70'
                          : 'hover:bg-slate-50 cursor-pointer'
                          }`}
                      >
                        {/* Week Number Column */}
                        <td className="sticky left-0 z-20 bg-white p-2 border-r border-slate-200 font-medium text-slate-800 min-w-[120px]">
                          <div className="flex flex-col items-start">
                            <div className="flex items-baseline">
                              <span className="font-bold text-lg">№{week.weekNumber}</span>
                              {week.weekNumber === currentDate.week && (
                                <span className="ml-1.5 px-1.5 py-0.5 bg-indigo-100 text-indigo-800 text-[0.65rem] rounded-full font-medium">
                                  Сейчас
                                </span>
                              )}
                            </div>
                            <div className="text-[0.7rem] text-slate-500 mt-0.5">
                              {week.startDate} — {week.endDate}
                            </div>
                          </div>
                        </td>

                        {/* Days Columns */}
                        {week.days.map(day => {
                          const isHighlighted = highlightedCell?.week === week.weekNumber && highlightedCell?.day === day.dayIndex;
                          const hasSpecialEvent = day.dayIndex === 1 || day.dayIndex === 4;

                          return (
                            <td
                              key={day.dayIndex}
                              onMouseEnter={() => handleDayHover(week.weekNumber, day.dayIndex)}
                              onMouseLeave={handleDayLeave}
                              className={`p-1.5 border-r border-slate-100 align-top transition-colors ${day.isToday ? 'bg-indigo-100/80 ring-2 ring-indigo-300' :
                                isHighlighted ? 'bg-slate-100' : ''
                                }`}
                            >
                              <div
                                className={`rounded-lg p-1.5 min-h-[80px] flex flex-col ${day.hasPairs ? 'bg-white shadow-sm border border-slate-100' : 'bg-slate-50'
                                  }`}
                              >
                                {/* Date Header */}
                                <div className="flex justify-between items-start mb-1.5">
                                  <div className="text-[0.7rem] font-medium text-slate-500">{day.dayName}</div>
                                  <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${day.isToday
                                    ? 'bg-indigo-600 text-white shadow-md'
                                    : day.hasPairs
                                      ? 'bg-indigo-100 text-indigo-800'
                                      : 'bg-slate-200 text-slate-500'
                                    }`}>
                                    {day.dayOfMonth}
                                  </div>
                                </div>

                                {/* Special Events */}
                                {hasSpecialEvent && (
                                  <div className={`mb-1 px-1.5 py-0.5 rounded text-[0.65rem] font-medium ${day.dayIndex === 1
                                    ? 'bg-blue-50 text-blue-800'
                                    : 'bg-emerald-50 text-emerald-800'
                                    }`}>
                                    {day.dayIndex === 1 ? 'Разговор о важном' : 'Классный час'}
                                  </div>
                                )}

                                {/* Pairs Preview - ПОЛНЫЙ СПИСОК С ГРУППОЙ И ПРЕДМЕТОМ */}
                                {day.hasPairs ? (
                                  <div className="space-y-1 max-h-[240px] overflow-y-auto pr-1 flex-1">
                                    {day.pairs.map((pair, idx) => (
                                      <div
                                        key={idx}
                                        className="text-[0.65rem] bg-indigo-50 text-indigo-800 px-1.5 py-1 rounded truncate"
                                        title={`${pair.group}: ${pair.subject}`}
                                      >
                                        <span className="font-medium">{pair.group}</span>: {pair.subject}
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <div className="flex-1 flex items-center justify-center">
                                    <div className="text-[0.65rem] text-slate-400">Свободно</div>
                                  </div>
                                )}
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Legend */}
        <div className="p-3 border-t border-slate-200 bg-slate-50 flex flex-wrap justify-center gap-4 text-xs">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-indigo-600 mr-1.5"></div>
            <span className="text-slate-700">Текущий день</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-indigo-100 border border-indigo-300 mr-1.5"></div>
            <span className="text-slate-700">Есть занятия</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-slate-200 mr-1.5"></div>
            <span className="text-slate-700">Свободно</span>
          </div>
          <div className="flex items-center">
            <div className="px-1.5 py-0.5 bg-blue-50 text-blue-800 text-[0.65rem] rounded mr-1.5"></div>
            <span className="text-slate-700">Разговор о важном</span>
          </div>
          <div className="flex items-center">
            <div className="px-1.5 py-0.5 bg-emerald-50 text-emerald-800 text-[0.65rem] rounded mr-1.5"></div>
            <span className="text-slate-700">Классный час</span>
          </div>
        </div>
      </div>


    </div>
  )
}
