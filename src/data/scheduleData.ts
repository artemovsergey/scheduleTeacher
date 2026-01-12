import type ScheduleTeacher from "../models/schedule"

export let schedules: ScheduleTeacher[] = [

// Понедельник
{id: 1, weekDay: 1, numberPair: 1, subject: "МДК 01.03"  , group: "ИП235", weeks: [1,2,3,4,5,6,7,8,9,10,11,15,17] },
{id: 2, weekDay: 1, numberPair: 2, subject: "МДК 01.03"  , group: "ИП235", weeks: [1,2,3,4,5,6,7,8,9,10,11,15,17] },
{id: 3, weekDay: 1, numberPair: 3, subject: "МДК 09.01" , group: "ИВ234", weeks: [1,2,3,4,8,9,10,11,12,13,14,15,16,17,18,19,20] },
{id: 4, weekDay: 1, numberPair: 4, subject: "МДК 01.03"  , group: "ИП232", weeks: [4,9,10,11] },
{id: 5, weekDay: 1, numberPair: 4, subject: "МДК 01.03"  , group: "ИП236", weeks: [1,2,3,4,5,6,7,8,12,14,15,16] },
{id: 6, weekDay: 1, numberPair: 5, subject: "МДК 01.03"  , group: "ИП236", weeks: [1,2,7,8] },

// Вторник
{id: 7, weekDay: 2, numberPair: 1, subject: "МДК 01.03"  , group: "ИП235", weeks: [1,2,3,4,7,8,9,10,11,15,17] },
{id: 8, weekDay: 2, numberPair: 2, subject: "МДК 01.03"  , group: "ИП232", weeks: [1,2,3,4,5,6,7,8,9,10,11,13,14] },
{id: 9, weekDay: 2, numberPair: 3, subject: "МДК 09.01" , group: "ИВ234", weeks: [1,2,3,8,9,10,11,12,13,14,15,16,17,18,19] },
{id: 10, weekDay: 2, numberPair: 4, subject: "МДК 01.03"  , group: "ИП232", weeks: [9,11] },
{id: 11, weekDay: 2, numberPair: 4, subject: "МДК 01.03"  , group: "ИП236", weeks: [1,2,3,4,5,6,7,8,14] },
{id: 12, weekDay: 2, numberPair: 5, subject: "МДК 01.03"  , group: "ИП235", weeks: [7] },
{id: 13, weekDay: 2, numberPair: 5, subject: "МДК 01.03"  , group: "ИП236", weeks: [1,2,3,4,7,8,14] },

// Среда
{id: 14, weekDay: 3, numberPair: 1, subject: "МДК 01.03"  , group: "ИП235", weeks: [1,2,3,4,7,8,9,10,11,15] },
{id: 15, weekDay: 3, numberPair: 2, subject: "МДК 01.03"  , group: "ИП232", weeks: [1,2,3,4,5,6,7,8,9,10,11,13,14] },
{id: 16, weekDay: 3, numberPair: 2, subject: "МДК 01.03"  , group: "ИП236", weeks: [15] },
{id: 17, weekDay: 3, numberPair: 3, subject: "МДК 01.03"  , group: "ИП232", weeks: [1,2,3,4,5,6,7,8,9,10,11,13,14] },
{id: 18, weekDay: 3, numberPair: 4, subject: "МДК 01.03"  , group: "ИП232", weeks: [1,2,3,4,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22] },
{id: 19, weekDay: 3, numberPair: 4, subject: "МДК 01.03"  , group: "ИП236", weeks: [12,14,15,16] },

// Четверг
 {id: 20, weekDay: 4, numberPair: 1, subject: "МДК 01.03"  , group: "ИП235", weeks: [7] },
 {id: 21, weekDay: 4, numberPair: 1, subject: "МДК 09.01" , group: "ИВ234", weeks: [2,3,4,8,9,10,11,14,15,17,18,19] },
 {id: 22, weekDay: 4, numberPair: 2, subject: "МДК 01.03"  , group: "ИП235", weeks: [1,2,3,4,5,6,7,8,9,10,11,15,17] },
 {id: 23, weekDay: 4, numberPair: 2, subject: "МДК 01.03"  , group: "ИП236", weeks: [3,7] },
 {id: 24, weekDay: 4, numberPair: 3, subject: "МДК 01.03"  , group: "ИП236", weeks: [1,2,3,4,5,6,7,8,12,14,15,16,17] },
 {id: 25, weekDay: 4, numberPair: 4, subject: "МДК 01.03"  , group: "ИП232", weeks: [1,2,3,4,7,8,9,10,11] },
 {id: 26, weekDay: 4, numberPair: 4, subject: "МДК 01.03"  , group: "ИП236", weeks: [12,14,15,16,17] },
 {id: 27, weekDay: 4, numberPair: 5, subject: "МДК 01.03"  , group: "ИП236", weeks: [1,2,3,4,7,8,14,15] },

// Пятница
 {id: 28, weekDay: 5, numberPair: 1, subject: "МДК 01.03"  , group: "ИП236", weeks: [1,2,3,4,5,6,7,8,14,15,17] },
 {id: 29, weekDay: 5, numberPair: 2, subject: "МДК 01.03"  , group: "ИП236", weeks: [1,2,3,4,5,6,7,8,9,10,11,15,17] },
 {id: 30, weekDay: 5, numberPair: 3, subject: "МДК 01.03"  , group: "ИП232", weeks: [1,2,3,4,5,6,7,8,9,10,11,13,14] },
 {id: 31, weekDay: 5, numberPair: 4, subject: "МДК 01.03"  , group: "ИП232", weeks: [1,3,7] },
 {id: 32, weekDay: 5, numberPair: 4, subject: "МДК 01.03"  , group: "ИП236", weeks: [1,2,4] },
 {id: 33, weekDay: 5, numberPair: 4, subject: "МДК 01.03"  , group: "ИП235", weeks: [8,9,11] }

]