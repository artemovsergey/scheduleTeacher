import { useNavigate } from "react-router-dom";
import type ScheduleTeacher from "../models/schedule"
import { Pair } from "./Pair"

export const ScheduleByDay = (props: { schedule: ScheduleTeacher[], removeSchedule: any, weekNumber: number, weekDay: number, isAllWeeks: boolean }) => {

    const navigate = useNavigate();

    let currentDate: string = `${new Date().getDate()}.${(new Date().getMonth() + 1).toString().padStart(2, '0')}`
    // currentDate = '12.01'
    return (
        <div className={`flex flex-col p-5 items-center border rounded-2xl w-100 ${currentDate === getDateDay(props.weekNumber, props.weekDay) ? "bg-amber-100 text-black" : "bg-white"}`}>


            <h1 className="font-semibold self-start"> {DayWeekName(props.weekDay)} </h1>

            {/* Дата */}
            <h1 className="font-semibold self-start"> {getDateDay(props.weekNumber, props.weekDay)} </h1>

            {props.weekDay == 1 ?
                <p className="self-start"> Разговор о важном </p>
                : null}

            {props.weekDay == 4 ?
                <p className=" text-green-900 self-start"> Классный час </p>
                : null}

            <span title="Добавить пару" className="self-end flex items-center justify-center w-10 h-10 opacity-0 rounded-full bg-amber-500 cursor-pointer hover:opacity-100 transition-opacity duration-300" onClick={() => navigate('/create')}>+</span>

            <ul>
                {
                    props.schedule.map(s => {

                        if (s.weekDay == props.weekDay && s.weeks.includes(props.weekNumber)) {
                            return <li key={s.id}>
                                <div className="flex items-center">
                                    <Pair pair={s} isAllWeeks={props.isAllWeeks} />
                                    <span title="Удалить пару" className="flex items-center justify-center w-10 h-10 opacity-0 rounded-full bg-amber-500 cursor-pointer hover:opacity-100 transition-opacity duration-300" onClick={() => props.removeSchedule(s)}>X</span>
                                </div>
                            </li>
                        }
                    }
                    )
                }
            </ul>

        </div>
    )
}

function DayWeekName(n: number) {
    switch (n) {
        case 1:
            return "Понедельник"
            break;
        case 2:
            return "Вторник"
            break;
        case 3:
            return "Среда"
            break;
        case 4:
            return "Четверг"
            break;
        case 5:
            return "Пятница"
            break;
        default:
            break;
    }
}

export function getDateDay(weekNumber: number, weekDay: number) {

    const baseDate = new Date(2026, 0, 12); // Месяцы в JS: 0=январь, 1=февраль...
    const startDate = new Date(baseDate);
    startDate.setDate(startDate.getDate() + (weekNumber - 1) * 7 + (weekDay - 1));

    // Форматируем даты в строку DD.MM.YYYY
    const formatDate = (date: Date): string => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        return `${day}.${month}`;
    };

    return `${formatDate(startDate)}`
}

