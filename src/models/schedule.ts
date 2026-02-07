export default interface ScheduleTeacher{
    id: string,
    weekDay: number, // 1-5
    numberPair: number // 1-6
    group: string,
    subject: string // предмет
    weeks: number[]
    status?: "замена" | "снято" | "новое"
    // isReplacement: boolean
    // addedDate: string
}

