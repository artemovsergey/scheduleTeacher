// GridSchedule.tsx - Сетка всех недель
import type ScheduleTeacher from "../models/schedule";

export const GridSchedule = ({
    schedules,
    onRemovePair
}: {
    schedules: ScheduleTeacher[],
    onRemovePair: (pair: ScheduleTeacher) => void
}) => {
    const weeks = Array.from({ length: 22 }, (_, i) => i + 1);
    const days = [1, 2, 3, 4, 5];

    const getPairsForCell = (week: number, day: number) => {
        return schedules.filter(s => s.weekDay === day && s.weeks.includes(week));
    };

    // Определяем текущий день для подсветки
    const today = new Date();
    const baseDate = new Date(2026, 0, 12);
    const diffTime = today.getTime() - baseDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const currentWeek = Math.min(Math.max(1, Math.floor(diffDays / 7) + 1), 22);
    const currentDay = (today.getDay() === 0 ? 7 : today.getDay());
    const normalizedDay = currentDay > 5 ? 1 : currentDay;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto text-sm">
                    <thead className="bg-slate-50 sticky top-0 z-10">
                        <tr>
                            <th className="sticky left-0 z-20 bg-slate-50 p-3 border-b border-r border-slate-200 font-medium text-slate-700">Неделя</th>
                            {days.map(day => (
                                <th key={day} className="p-3 border-b border-slate-200 font-medium text-slate-700 text-center">
                                    {DayWeekNameShort(day)}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {weeks.map(week => (
                            <tr key={week} className="border-b border-slate-100">
                                <td className="sticky left-0 z-10 bg-white p-2 border-r border-slate-200 font-medium text-slate-700">
                                    {week}
                                </td>
                                {days.map(day => {
                                    const pairs = getPairsForCell(week, day);
                                    const isToday = week === currentWeek && day === normalizedDay;
                                    return (
                                        <td
                                            key={`${week}-${day}`}
                                            className={`p-2 border-r border-slate-100 align-top min-w-[120px] ${isToday ? 'bg-blue-50' : ''}`}
                                        >
                                            {pairs.length > 0 ? (
                                                <div className="space-y-1.5">
                                                    {pairs.map(pair => (
                                                        <div
                                                            key={pair.id}
                                                            className="p-2 bg-white rounded border border-slate-200 hover:shadow-sm transition-shadow"
                                                        >
                                                            <div className="font-medium text-slate-800 text-xs">Пара {pair.numberPair}</div>
                                                            <div className="text-[0.65rem] text-slate-600 truncate">{pair.subject}</div>
                                                            <div className="text-[0.6rem] text-slate-500 mt-0.5">{pair.group}</div>
                                                            <button
                                                                onClick={() => onRemovePair(pair)}
                                                                className="mt-1 text-[0.65rem] text-red-500 hover:text-red-700 font-medium flex items-center"
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                                                                </svg>
                                                                Удалить
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="text-center text-slate-400 text-xs py-1.5">Свободно</div>
                                            )}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

function DayWeekNameShort(n: number) {
    const days = ["", "Пн", "Вт", "Ср", "Чт", "Пт"];
    return days[n] || "";
}