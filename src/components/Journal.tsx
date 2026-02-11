// Journal.tsx
import { useState, useMemo } from "react";
import type ScheduleTeacher from "../models/schedule";
import { getDateDay } from "../utilites/date";

export function Journal({ schedule }: { schedule: ScheduleTeacher[] }) {
  const [group, setGroup] = useState("");
  const [subject, setSubject] = useState("");

  // Определяем статус пары по дате
  const getDateStatus = (dateStr: string): "past" | "today" | "future" => {
    const [day, month, year] = dateStr.split('.').map(Number);
    const pairDate = new Date(year || new Date().getFullYear(), month - 1, day);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    pairDate.setHours(0, 0, 0, 0);

    if (pairDate.getTime() === today.getTime()) return "today";
    if (pairDate < today) return "past";
    return "future";
  };

  // Получаем все пары с их статусами (каждая неделя - отдельная запись)
  const allPairs = useMemo(() => {
    if (!group || !subject) return [];

    // Используем Map для уникальности (ключ: id-неделя)
    const pairsMap = new Map<string, { date: string; pairStatus?: "" | "снята" | "новая" }>();

    schedule
      .filter(p => p.group === group && p.subject === subject)
      .forEach(p => {
        p.weeks.forEach(w => {
          const key = `${p.id}-${w}`; // уникальный ключ для каждой пары
          pairsMap.set(key, {
            date: getDateDay(w, p.weekDay),
            pairStatus: p.status
          });
        });
      });

    // Преобразуем в массив и сортируем по дате
    const pairsArray = Array.from(pairsMap.values());

    // Сортируем массив напрямую по дате
    const sortedPairs = [...pairsArray].sort((a, b) => {
      const [dayA, monthA, yearA] = a.date.split('.').map(Number);
      const [dayB, monthB, yearB] = b.date.split('.').map(Number);

      const dateA = new Date(yearA || new Date().getFullYear(), monthA - 1, dayA);
      const dateB = new Date(yearB || new Date().getFullYear(), monthB - 1, dayB);

      return dateA.getTime() - dateB.getTime();
    });

    return sortedPairs;
  }, [group, subject, schedule]);

  return (
    <div className="py-2">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
          {(!group || !subject) ? (
            <h1 className="text-lg font-semibold text-slate-800 text-center">
              Выберите группу и предмет:{" "}
              <span className="font-medium text-indigo-700 mx-1">{group}</span>
              <span className="font-medium text-indigo-700 mx-1">{subject}</span>
            </h1>
          ) : (
            <h1 className="text-lg font-semibold text-slate-800 text-center">
              Журнал:{" "}
              <span className="font-medium text-indigo-700 mx-1">{group}</span>
              <span className="font-medium text-indigo-700 mx-1">{subject}</span>
            </h1>
          )}
        </div>

        <div className="p-4 space-y-5">
          <div className="space-y-4">
            <div>
              <h2 className="font-medium text-slate-700 mb-2 text-sm">Группы</h2>
              <div className="flex flex-wrap gap-1.5 overflow-x-auto pb-1.5 -ml-1">
                {[...new Set(schedule.map(s => s.group))].map((g, idx) => (
                  <button
                    key={`group-${idx}`}
                    onClick={() => setGroup(g)}
                    className={`flex-shrink-0 px-3 py-1.5 text-sm rounded-lg transition-colors whitespace-nowrap ${group === g
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
                    key={`subject-${idx}`}
                    onClick={() => setSubject(s)}
                    className={`flex-shrink-0 px-3 py-1.5 text-sm rounded-lg transition-colors whitespace-nowrap ${subject === s
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

          {group && subject && allPairs.length === 0 && (
            <div className="bg-slate-50 rounded-lg p-4 text-center border border-slate-200">
              <div className="text-slate-600 mt-1 text-sm">Нет занятий в семестре</div>
            </div>
          )}

          {allPairs.length > 0 && (
            <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 font-bold text-sm">
                  {allPairs.length}
                </div>
                <span className="text-sm font-medium text-slate-700">Занятий в семестре</span>
              </div>
            </div>
          )}

          {allPairs.length > 0 && (
            <div className="overflow-x-auto">
              <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden rounded-lg border border-slate-200">
                  <table className="min-w-full text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="px-3 py-2.5 text-center font-medium text-slate-600 w-12">№</th>
                        <th className="px-3 py-2.5 text-left font-medium text-slate-600">Дата</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {allPairs.map((pair, index) => {
                        const dateStatus = getDateStatus(pair.date);
                        const isPast = dateStatus === "past";
                        const isToday = dateStatus === "today";
                        const isNew = pair.pairStatus === "новая";

                        return (
                          <tr key={index} className="hover:bg-slate-50 transition-colors">
                            <td className={`px-3 py-2.5 text-center font-bold ${isPast ? 'text-slate-400' :
                              isToday ? 'text-amber-600' :
                                'text-slate-700'
                              }`}>
                              {index + 1}
                            </td>
                            <td className="px-3 py-2.5">
                              <div className="flex items-center gap-2">
                                <span className={`font-medium ${isPast ? 'text-slate-400' :
                                  isToday ? 'text-amber-600' :
                                    'text-slate-800'
                                  }`}>
                                  {pair.date}
                                </span>
                                {/* Бейдж ТОЛЬКО для пар со статусом "новая" */}
                                {isNew && (
                                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800 whitespace-nowrap">
                                    Новая
                                  </span>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}