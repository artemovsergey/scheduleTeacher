import { useState } from "react"
import "../data/scheduleData"
import { ScheduleByDay } from "./ScheduleByDay"
import type ScheduleTeacher from "../models/schedule"

export default function Home(props: { schedules: ScheduleTeacher[], onRemovePair: (pair: ScheduleTeacher) => void }) {

    const [currentWeek, setcurrentWeek] = useState(1)
    const [isAllWeeks, setIsAllWeeks] = useState(false)

    // const loadToLocalStorage = () => {

    //     let currentSchedule = localStorage.getItem("scheduleSave")
    //     if (currentSchedule == null) {
    //         localStorage.setItem("scheduleSave", JSON.stringify(props.schedules))
    //         console.log("Загрузка расписания в localStorage")
    //     } else {
    //         let loadedSchedule: ScheduleTeacher[] = JSON.parse(currentSchedule)
    //         console.log("Загрузка расписания из localStorage")
    //         console.log(loadedSchedule)
    //         // setCurrentSchedule(loadedSchedule)
    //     }
    // }

    // useEffect(() => loadToLocalStorage(), [])

    return (
        <main className="flex flex-1 flex-col ml-5 gap-5 mt-10 items-center">

            <span className="m-2">

                <input type="checkbox"
                    checked={isAllWeeks}
                    onChange={() => { setIsAllWeeks(!isAllWeeks) }} />
                <label> Все недели </label>
            </span>

            <div className="flex flex-row m-2 items-center ">
                <button className="p-2 m-2 text-1xl rounded-full hover:bg-amber-500 disabled:bg-gray-200  border border-amber-300 w-10"
                    disabled={currentWeek == 1}
                    onClick={() => setcurrentWeek(w => w - 1)}>
                    &larr;
                </button>

                <span className="m-2"> Неделя {currentWeek} </span>

                <span className="m-2"> Даты: {getWeekDateRange(currentWeek)} </span>

                <button className="p-2 m-2 text-1xl rounded-full hover:bg-amber-500  disabled:bg-gray-200 border border-amber-300 w-10"
                    disabled={currentWeek == 22}
                    onClick={() => setcurrentWeek(w => w + 1)}>
                    &rarr;
                </button>
            </div>

            <ScheduleByDay key={1} removeSchedule={props.onRemovePair} schedule={props.schedules} weekDay={1} weekNumber={currentWeek} isAllWeeks={isAllWeeks} />
            <ScheduleByDay key={2} removeSchedule={props.onRemovePair} schedule={props.schedules} weekDay={2} weekNumber={currentWeek} isAllWeeks={isAllWeeks} />
            <ScheduleByDay key={3} removeSchedule={props.onRemovePair} schedule={props.schedules} weekDay={3} weekNumber={currentWeek} isAllWeeks={isAllWeeks} />
            <ScheduleByDay key={4} removeSchedule={props.onRemovePair} schedule={props.schedules} weekDay={4} weekNumber={currentWeek} isAllWeeks={isAllWeeks} />
            <ScheduleByDay key={5} removeSchedule={props.onRemovePair} schedule={props.schedules} weekDay={5} weekNumber={currentWeek} isAllWeeks={isAllWeeks} />
        </main>
    )
}


function getWeekDateRange(weekNumber: number) {

    // Базовая дата - начало первой недели (12.01.2026)
    const baseDate = new Date(2026, 0, 12); // Месяцы в JS: 0=январь, 1=февраль...

    // Вычисляем дату начала недели
    const startDate = new Date(baseDate);
    // Каждая следующая неделя начинается через 7 дней
    startDate.setDate(startDate.getDate() + (weekNumber - 1) * 7);

    // Дата конца недели (начало + 4 дня, так как неделя с понедельника по пятницу)
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 4);

    // Форматируем даты в строку DD.MM.YYYY
    const formatDate = (date: Date): string => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        // const year = date.getFullYear();
        return `${day}.${month}`;
    };

    return `${formatDate(startDate)} - ${formatDate(endDate)}`
}


