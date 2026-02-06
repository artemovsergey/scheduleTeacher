import { useState } from "react"
import { getDateDay } from "./ScheduleByDay"
import type ScheduleTeacher from "../models/schedule"

export function Journal(props: { schedule: ScheduleTeacher[] }) {

    const [group, setGroup] = useState("ИП232")
    const [subject, setSubject] = useState("МДК 01.03")
    // const [schedule, setSchedule] = useState<ScheduleTeacher[]>([])

    // useEffect(() => setSchedule(JSON.parse(localStorage.getItem("scheduleSave") || "[]")), [])

    const allDates: string[] = []

    // Пар в неделю
    const pairsInWeek = (group: string, subject: string) => {
        return props.schedule.filter(p => p.group == group && p.subject == subject)
    }

    console.log(pairsInWeek(group, subject))
    console.log(group)
    console.log(subject)

    pairsInWeek(group, subject).map(p => {
        p.weeks.map(w => {
            allDates.push(getDateDay(w, p.weekDay))
        }
        )
    }
    )


    return (
        <div className="flex flex-1 flex-col p-4 justify-center items-center">

            <div className="mb-10">


                <h1 className="m-2 p-2 text-3xl font-bold">
                    Журнал группы {group} по предмету {subject}
                </h1>

                <h2 className="m-2 p-2">Группы</h2>
                <div>
                    {props.schedule.map(s => s.group).filter((value, index, self) => self.indexOf(value) === index).map((group, index) => (
                        <span key={index}
                            onClick={() => setGroup(group)}
                            className="mr-2 px-3 py-1 cursor-pointer hover:bg-amber-500 bg-amber-200 rounded-full inline-block mb-2">
                            {group}
                        </span>
                    ))}
                </div>

                <h2 className="m-2 p-2">Предметы</h2>
                <div>
                    {props.schedule.map(s => s.subject).filter((value, index, self) => self.indexOf(value) === index).map((group, index) => (
                        <span key={index}
                            onClick={() => setSubject(group)}
                            className="mr-2 px-3 py-1 cursor-pointer hover:bg-amber-500 bg-amber-200 rounded-full inline-block mb-2">
                            {group}
                        </span>
                    ))}
                </div>

                <span className="block m-2 p-2 text-300 text-2xl">Количество пар в семестре по группе и предмету: {allDates.length}</span>

            </div>

            {allDates.length > 0 && <table className="w-75">
                <thead>
                    <tr>
                        <th className="border px-4 py-2 w-1/12">№</th>
                        <th className="border px-4 py-2">Дата</th>
                    </tr>
                </thead>
                <tbody>
                    {sortByDates(allDates).map((date, index) => (
                        <tr key={index}>
                            <td className="border px-4 py-2 text-center">{index + 1}</td>
                            <td className="border px-4 py-2 text-center">{date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            }

            {/* <ul>
                {sortByDates(allDates).map((date, index) => (
                    <li key={index}> {index + 1} {date}</li>
                ))}
            </ul> */}
        </div>
    )
}


const sortByDates = (dates: string[]) =>

    dates.sort((a, b) => {
        // Разбиваем строки на день и месяц
        const [dayA, monthA] = a.split('.').map(Number);
        const [dayB, monthB] = b.split('.').map(Number);

        // Создаем даты с фиксированным годом (например, 2000)
        const dateA = new Date(2000, monthA - 1, dayA);
        const dateB = new Date(2000, monthB - 1, dayB);

        return dateA.getTime() - dateB.getTime();
    });