// ScheduleDay.tsx
import { useState, useEffect } from "react";
import type ScheduleTeacher from "../models/schedule";
import { PAIR_SCHEDULES } from "../utilites/pair_time";

export const ScheduleDay = ({
  pairs,
  weekDay,
  onRemovePair,
  isToday
}: {
  pairs: ScheduleTeacher[],
  weekDay: number,
  weekNumber: number,
  onRemovePair: (pair: ScheduleTeacher) => void,
  isToday: boolean
}) => {

  // const currentDate = getDateDay(weekNumber, weekDay);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Обновляем текущее время каждую секунду
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Получаем время пары по номеру и дню недели
  const getPairTime = (numberPair: number, dayOfWeek: number) => {
    const schedule = PAIR_SCHEDULES[dayOfWeek] || PAIR_SCHEDULES[1]; // По умолчанию понедельник

    if (numberPair >= 1 && numberPair <= schedule.length) {
      return schedule[numberPair - 1];
    }
    return { start: "00:00", end: "00:00" };
  };

  // Проверяем, идет ли сейчас эта пара
  const isPairActive = (pair: ScheduleTeacher) => {
    if (!isToday) return null;

    const pairTime = getPairTime(pair.numberPair, weekDay);
    const now = currentTime;
    const [startHour, startMin] = pairTime.start.split(':').map(Number);
    const [endHour, endMin] = pairTime.end.split(':').map(Number);

    const startDate = new Date(now);
    startDate.setHours(startHour, startMin, 0, 0);

    const endDate = new Date(now);
    endDate.setHours(endHour, endMin, 0, 0);

    if (now >= startDate && now <= endDate) {
      // Пара идет сейчас
      const remainingMs = endDate.getTime() - now.getTime();
      const remainingMinutes = Math.floor(remainingMs / 60000);
      const remainingSeconds = Math.floor((remainingMs % 60000) / 1000);

      return {
        isActive: true,
        remainingMinutes,
        remainingSeconds
      };
    }

    if (now < startDate) {
      // Пара ещё не началась
      return { isActive: false, isUpcoming: true };
    }

    // Пара уже закончилась
    return { isActive: false, isUpcoming: false };
  };

  return (
    <div className="relative space-y-2">

      {/* Состояние: нет пар */}
      {pairs.length === 0 && (
        <div className="text-center py-12 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200">
          <div className="text-5xl mb-3">🕗</div>
          <p className="text-slate-600 font-medium text-lg">Нет занятий</p>
        </div>
      )}

      {/* Список пар */}

      {pairs.sort((p1, p2) => p1.numberPair - p2.numberPair).map(pair => {
        const pairTime = getPairTime(pair.numberPair, weekDay);
        const pairStatus = isPairActive(pair);
        const isActive = pairStatus?.isActive;
        const isUpcoming = pairStatus?.isUpcoming;

        return (
          <div
            key={pair.id}
            className={`group relative flex items-start p-3 rounded-xl border transition-all ${isActive
              ? 'bg-gradient-to-r from-indigo-50 to-blue-50 border-indigo-300 ring-1 ring-indigo-200 shadow-md'
              : isUpcoming
                ? 'bg-slate-50 border-slate-200'
                : 'bg-white border-slate-200 hover:border-indigo-200 hover:shadow-md'
              }`}
          >
            {/* Кнопка удаления — появляется только при наведении */}
            <button
              title="Удалить"
              onClick={() => onRemovePair(pair)}
              className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600"
              aria-label={`Удалить пару ${pair.subject}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>

            {/* Номер пары */}
            <div className="flex-shrink-0 mr-3 mt-0.5">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${isActive
                ? 'bg-indigo-600 text-white'
                : 'bg-indigo-50 text-indigo-700'
                }`}>
                {pair.numberPair}
              </div>
            </div>

            <div className="flex-1 min-w-0">
              {/* Время пары */}
              <div className="flex items-center mb-1.5">
                <div className={`text-xs font-medium px-2 py-0.5 rounded ${isActive
                  ? 'bg-indigo-100 text-indigo-800'
                  : isUpcoming
                    ? 'bg-slate-100 text-slate-600'
                    : 'bg-slate-100 text-slate-600'
                  }`}>
                  {pairTime.start} – {pairTime.end}
                </div>

                {/* Таймер для текущей пары */}
                {isActive && (
                  <div className="ml-2 flex items-center px-2 py-0.5 bg-red-50 text-red-700 rounded text-xs font-medium">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{pairStatus.remainingMinutes}:{pairStatus.remainingSeconds!.toString().padStart(2, '0')}</span>
                  </div>
                )}
              </div>

              {/* Основная информация */}
              <div className="min-w-0">
                <div className={`font-bold truncate ${isActive ? 'text-indigo-900' : 'text-slate-800'
                  }`}>
                  {pair.subject}
                </div>
                <div className="flex items-center mt-1 text-sm text-slate-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1.5 text-slate-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="truncate">{pair.group}</span>
                </div>

                {/* Статус */}
                {pair.status && (
                  <div className="mt-1 inline-block px-2 py-0.5 bg-amber-50 text-amber-800 text-xs rounded-md font-medium">
                    {pair.status}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  )
}

