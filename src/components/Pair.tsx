import type ScheduleTeacher from "../models/schedule"

export const Pair = (props: { pair: ScheduleTeacher, isAllWeeks: boolean }) => {

    return (
        <div>
            <span className="inline-block m-2 p-2 cursor-pointer hover:bg-amber-200" onClick={() => console.log(props.pair)}>
                {props.pair.numberPair} пара {props.pair.group} {props.pair.subject}
                <p className="text-[10px] text-center">
                    {props.isAllWeeks ? props.pair.weeks.join(" ") : ""}
                </p>
            </span>
        </div>
    )
}