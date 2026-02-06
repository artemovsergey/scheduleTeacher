// Pair.tsx - Минималистичная карточка с улучшенной читаемостью
import type ScheduleTeacher from "../models/schedule";

export const Pair = ({ pair, isAllWeeks }: {
  pair: ScheduleTeacher,
  isAllWeeks: boolean
}) => {
  return (
    <div
      className="p-3 bg-white border-l-3 border-blue-500 rounded-r-lg w-full min-h-[56px] 
        hover:bg-slate-50 transition-colors cursor-pointer"
      onClick={() => console.log(pair)}
      role="button"
      tabIndex={0}
      aria-label={`Пара ${pair.numberPair}: ${pair.subject} у группы ${pair.group}`}
    >
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1.5">
        <div className="min-w-0 flex-1">
          <div className="font-medium text-slate-800 text-sm">Пара {pair.numberPair}</div>
          <div className="font-medium text-slate-900 text-sm mt-0.5 truncate">{pair.subject}</div>
          <div className="text-xs text-slate-600 mt-0.5 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {pair.group}
          </div>
        </div>
        {pair.status && (
          <span className="shrink-0 mt-1 sm:mt-0 px-2 py-0.5 bg-amber-50 text-amber-800 text-[0.7rem] rounded-md whitespace-nowrap">
            {pair.status}
          </span>
        )}
      </div>

      {isAllWeeks && pair.weeks.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {pair.weeks.slice(0, 4).map((week: number) => (
            <span
              key={week}
              className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[0.7rem] rounded-md"
            >
              Н{week}
            </span>
          ))}
          {pair.weeks.length > 4 && (
            <span className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[0.7rem] rounded-md">
              +{pair.weeks.length - 4}
            </span>
          )}
        </div>
      )}
    </div>
  )
}