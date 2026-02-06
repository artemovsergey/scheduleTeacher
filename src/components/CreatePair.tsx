import { useState } from "react"
import { useNavigate } from "react-router-dom"
import type ScheduleTeacher from "../models/schedule"

export const CreatePair = (props: { teacher: string, schedule: any[], update: (s: ScheduleTeacher[]) => void }) => {

    const navigate = useNavigate()
    const [pair] = useState<any>({})

    const formHandler = (e: any) => {
        e.preventDefault();
        pair.weeks = pair.weeks.split(',').map((w: string) => parseInt(w.trim()))

        switch (props.teacher) {
            case 'asv':
                localStorage.setItem("scheduleASV", JSON.stringify([...props.schedule, pair]))
                break;
            case 'lsp':
                localStorage.setItem("scheduleLSP", JSON.stringify([...props.schedule, pair]))
                break;
            case 'eiv':
                localStorage.setItem("scheduleEIV", JSON.stringify([...props.schedule, pair]))
                break;
        }

        props.update([...props.schedule, pair])
        navigate('/')
        console.log(pair)
    }

    return (

        <form className="flex flex-1 flex-col ml-5 gap-5 mt-10 overflow-y-scroll min-w-max items-center" onSubmit={formHandler}>
            <input type="text" placeholder="ID" value={pair?.id} onChange={(e) => { pair.id = e.target.value }} />
            <input type="text" placeholder="День недели" value={pair?.weekDay} onChange={(e) => { pair.weekDay = e.target.value }} />
            <input type="text" placeholder="Номер пары" value={pair?.numberPair} onChange={(e) => { pair.numberPair = e.target.value }} />
            <input type="text" placeholder="Группа" value={pair?.group} onChange={(e) => { pair.group = e.target.value }} />
            <input type="text" placeholder="Предмет" value={pair?.subject} onChange={(e) => { pair.subject = e.target.value }} />
            <input type="text" placeholder="Номер текущей недели" value={pair?.weeks} onChange={(e) => { pair.weeks = e.target.value }} />
            <input type="text" placeholder="Статус пары" value={pair?.status} onChange={(e) => { pair.status = e.target.value }} />
            <input className="bg-amber-300 w-min p-2" type="submit" />
        </form>

    )
}