// Journal.tsx
import { useState } from "react";
import type ScheduleTeacher from "../models/schedule";

export function Journal({ schedule }: { schedule: ScheduleTeacher[] }) {
  const [group, setGroup] = useState("ИП232");
  const [subject, setSubject] = useState("МДК 01.03");
  const allDates: string[] = [];

  const pairsInWeek = (group: string, subject: string) => {
    return schedule.filter(p => p.group === group && p.subject === subject);
  };

  pairsInWeek(group, subject).forEach(p => {
    p.weeks.forEach(w => {
      allDates.push(getDateDay(w, p.weekDay));
    });
  });

  return (
    <div className="py-2">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
          <h1 className="text-lg font-semibold text-slate-800 text-center">
            Журнал группы <span className="font-medium text-indigo-700 mx-1">{group}</span>
            по предмету <span className="font-medium text-indigo-700 mx-1">{subject}</span>
          </h1>
        </div>
        
        <div className="p-4 space-y-5">
          <div className="space-y-4">
            <div>
              <h2 className="font-medium text-slate-700 mb-2 text-sm">Группы</h2>
              <div className="flex flex-wrap gap-1.5 overflow-x-auto pb-1.5 -ml-1">
                {[...new Set(schedule.map(s => s.group))].map((g, idx) => (
                  <button
                    key={idx}
                    onClick={() => setGroup(g)}
                    className={`flex-shrink-0 px-3 py-1.5 text-sm rounded-lg transition-colors whitespace-nowrap ${
                      group === g
                        ? 'bg-indigo-100 text-indigo-800 font-medium' 
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h2 className="font-medium text-slate-700 mb-2 text-sm">Предметы</h2>
              <div className="flex flex-wrap gap-1.5 overflow-x-auto pb-1.5 -ml-1">
                {[...new Set(schedule.map(s => s.subject))].map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSubject(s)}
                    className={`flex-shrink-0 px-3 py-1.5 text-sm rounded-lg transition-colors whitespace-nowrap ${
                      subject === s
                        ? 'bg-indigo-100 text-indigo-800 font-medium' 
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="bg-slate-50 rounded-lg p-4 text-center border border-slate-200">
            <div className="text-3xl font-bold text-slate-800">{allDates.length}</div>
            <div className="text-slate-600 mt-1 text-sm">Занятий в семестре</div>
          </div>
          
          {allDates.length > 0 && (
            <div className="overflow-x-auto rounded-lg border border-slate-200">
              <table className="min-w-full text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-3 py-2.5 text-left font-medium text-slate-600">#</th>
                    <th className="px-3 py-2.5 text-left font-medium text-slate-600">Дата</th>
                    <th className="px-3 py-2.5 text-left font-medium text-slate-600 hidden sm:table-cell">День</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {sortByDates(allDates).map((date, index) => (
                    <tr key={index} className="hover:bg-slate-50">
                      <td className="px-3 py-2.5 text-slate-700 font-medium">{index + 1}</td>
                      <td className="px-3 py-2.5 text-slate-800 font-medium">{date}</td>
                      <td className="px-3 py-2.5 text-slate-600 hidden sm:table-cell">
                        {getDayOfWeek(date)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const sortByDates = (dates: string[]) =>
  [...dates].sort((a, b) => {
    const [dayA, monthA] = a.split('.').map(Number);
    const [dayB, monthB] = b.split('.').map(Number);
    const dateA = new Date(2026, monthA - 1, dayA);
    const dateB = new Date(2026, monthB - 1, dayB);
    return dateA.getTime() - dateB.getTime();
  });

const getDayOfWeek = (dateStr: string): string => {
  const [day, month] = dateStr.split('.').map(Number);
  const date = new Date(2026, month - 1, day);
  const days = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
  return days[date.getDay()] || "";
};

const getDateDay = (weekNumber: number, weekDay: number) => {
  const baseDate = new Date(2026, 0, 12);
  const startDate = new Date(baseDate);
  startDate.setDate(startDate.getDate() + (weekNumber - 1) * 7 + (weekDay - 1));
  
  const day = startDate.getDate().toString().padStart(2, '0');
  const month = (startDate.getMonth() + 1).toString().padStart(2, '0');
  return `${day}.${month}`;
};