// Home.tsx
import { useState, useEffect } from "react";

import type ScheduleTeacher from "../models/schedule";
import { ScheduleDay } from "./ScheduleDay";
import { getDateDay, getWeekDateRange, DayWeekNameShort } from "../utilites/date";

export default function Home({
  schedules,
  onRemovePair,
  initialWeek = null
}: {
  schedules: ScheduleTeacher[],
  onRemovePair: (pair: ScheduleTeacher) => void,
  initialWeek?: number | null
}) {
  const [currentWeek, setCurrentWeek] = useState(1);
  const [todayInfo, setTodayInfo] = useState({ week: 1, day: 1 });
  const [activeDay, setActiveDay] = useState(1);

  useEffect(() => {
    const today = new Date();
    const baseDate = new Date(2026, 0, 12);
    const diffTime = today.getTime() - baseDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const week = Math.min(Math.max(1, Math.floor(diffDays / 7) + 1), 22);
    const day = (today.getDay() === 0 ? 7 : today.getDay());
    const normalizedDay = day > 5 ? 1 : day;

    setCurrentWeek(week);
    setTodayInfo({ week, day: normalizedDay });
    setActiveDay(normalizedDay);

    // Применяем сохраненную неделю если есть
    if (initialWeek && initialWeek >= 1 && initialWeek <= 22) {
      setCurrentWeek(initialWeek);
    }
  }, [initialWeek]);

  const jumpToToday = () => {
    setCurrentWeek(todayInfo.week);
    setActiveDay(todayInfo.day);

    setTimeout(() => {
      const dayElement = document.getElementById(`day-${todayInfo.day}`);
      if (dayElement) {
        dayElement.scrollIntoView({
          behavior: 'smooth',
          inline: 'center',
          block: 'nearest'
        });
      }
    }, 100);
  };

  const handlePrevWeek = () => {
    setCurrentWeek(w => Math.max(1, w - 1));
    if (activeDay > 5) setActiveDay(5);
  };

  const handleNextWeek = () => {
    setCurrentWeek(w => Math.min(22, w + 1));
    if (activeDay > 5) setActiveDay(1);
  };

  const getDayPairs = (day: number) => {
    return schedules.filter(s =>
      s.weekDay === day &&
      s.weeks.includes(currentWeek)
    );
  };

  const hasClasses = (day: number) => getDayPairs(day).length > 0;

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center justify-center space-x-3">
            <button
              onClick={handlePrevWeek}
              disabled={currentWeek === 1}
              className={`p-1.5 rounded-lg transition-colors ${currentWeek === 1
                ? 'text-slate-300 cursor-not-allowed'
                : 'text-slate-600 hover:bg-slate-100'
                }`}
              aria-label="Предыдущая неделя"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="text-center">
              <div className="font-bold text-slate-800">Неделя {currentWeek}</div>
              <div className="text-xs text-slate-500">{getWeekDateRange(currentWeek)}</div>
            </div>

            <button
              onClick={handleNextWeek}
              disabled={currentWeek === 22}
              className={`p-1.5 rounded-lg transition-colors ${currentWeek === 22
                ? 'text-slate-300 cursor-not-allowed'
                : 'text-slate-600 hover:bg-slate-100'
                }`}
              aria-label="Следующая неделя"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <button
            onClick={jumpToToday}
            className={`w-full sm:w-auto px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center ${currentWeek === todayInfo.week && activeDay === todayInfo.day
              ? 'bg-indigo-100 text-indigo-700'
              : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
              }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Сегодня
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="border-b border-slate-200">
          <div className="overflow-x-auto scrollbar-hide flex">
            {[1, 2, 3, 4, 5].map(day => {
              const isActive = activeDay === day;
              const isToday = currentWeek === todayInfo.week && day === todayInfo.day;
              const hasContent = hasClasses(day);

              return (
                <button
                  key={day}
                  id={`day-${day}`}
                  onClick={() => setActiveDay(day)}
                  className={`flex-1 min-w-[140px] md:min-w-0 md:flex-1 py-3 px-2 md:px-4 flex flex-col items-center justify-center transition-all ${isActive
                    ? 'bg-indigo-50 text-indigo-700 border-b-3 border-indigo-600'
                    : 'text-slate-600 hover:bg-slate-50'
                    } ${isToday ? 'relative' : ''}`}
                >
                  {isToday && (
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-indigo-600"></div>
                  )}
                  <div className="font-medium text-sm">{DayWeekNameShort(day)}</div>
                  <div className="text-xs mt-0.5 opacity-75">
                    {getDateDay(currentWeek, day)}
                  </div>
                  {!hasContent && (
                    <div className="mt-1 text-[0.65rem] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-full">
                      свободно
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-4">
          <ScheduleDay
            pairs={getDayPairs(activeDay)}
            weekDay={activeDay}
            weekNumber={currentWeek}
            onRemovePair={onRemovePair}
            isToday={currentWeek === todayInfo.week && activeDay === todayInfo.day}
          />
        </div>
      </div>
    </div>
  )
}

