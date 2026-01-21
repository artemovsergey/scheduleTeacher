import type ScheduleTeacher from "../models/schedule"

export let schedulesASV: ScheduleTeacher[] = [

// Понедельник
{id: 1, weekDay: 1, numberPair: 1, subject: "МДК 01.03"  , group: "ИП235", weeks: [1,2,3,4,5,6,7,8,9,10,11,15,17] },
{id: 2, weekDay: 1, numberPair: 2, subject: "МДК 01.04"  , group: "ИП235", weeks: [1,2,3,4,5,6,7,8,9,10,11,15,17] },
{id: 3, weekDay: 1, numberPair: 3, subject: "МДК 09.01" , group: "ИВ234", weeks: [1,2,3,4,8,9,10,11,12,13,14,15,16,17,18,19,20] },
{id: 4, weekDay: 1, numberPair: 4, subject: "МДК 01.04"  , group: "ИП232", weeks: [9,10,11] },
{id: 88, weekDay: 1, numberPair: 4, subject: "МДК 01.03"  , group: "ИП232", weeks: [4] },
{id: 5, weekDay: 1, numberPair: 4, subject: "МДК 01.03"  , group: "ИП236", weeks: [1,2,3,4,5,6,7,8,12,14,15,16] },
{id: 6, weekDay: 1, numberPair: 5, subject: "МДК 01.03"  , group: "ИП236", weeks: [1,2,7,8] },

// Вторник
{id: 7, weekDay: 2, numberPair: 1, subject: "МДК 01.04"  , group: "ИП235", weeks: [1,2,3,4,7,8,9,10,11,15,17] },
{id: 8, weekDay: 2, numberPair: 2, subject: "МДК 01.04"  , group: "ИП232", weeks: [1,2,3,4,5,6,7,8,9,10,11,13,14] },
{id: 9, weekDay: 2, numberPair: 3, subject: "МДК 09.01" , group: "ИВ234", weeks: [1,2,3,4,8,9,10,11,12,13,14,15,16,17,18,19] },
{id: 10, weekDay: 2, numberPair: 4, subject: "МДК 01.03"  , group: "ИП232", weeks: [9,11] },
{id: 11, weekDay: 2, numberPair: 4, subject: "МДК 01.03"  , group: "ИП236", weeks: [1,2,3,4,5,6,7,8,14] },
{id: 12, weekDay: 2, numberPair: 5, subject: "МДК 01.04"  , group: "ИП235", weeks: [7] },
{id: 13, weekDay: 2, numberPair: 5, subject: "МДК 01.04"  , group: "ИП236", weeks: [1,2,3,4,7,8,14] },

// Среда
{id: 14, weekDay: 3, numberPair: 1, subject: "МДК 01.03"  , group: "ИП235", weeks: [1,2,3,4,7,8,9,10,11,15] },
{id: 15, weekDay: 3, numberPair: 2, subject: "МДК 01.04"  , group: "ИП232", weeks: [1,2,3,4,5,6,7,8,9,10,11,13,14] },
{id: 16, weekDay: 3, numberPair: 2, subject: "МДК 01.03"  , group: "ИП236", weeks: [15] },
{id: 17, weekDay: 3, numberPair: 3, subject: "МДК 01.03"  , group: "ИП232", weeks: [1,2,3,4,5,6,7,8,9,10,11,13,14] },
{id: 18, weekDay: 3, numberPair: 4, subject: "МДК 01.03"  , group: "ИП232", weeks: [1,2,3,4,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22] },
{id: 19, weekDay: 3, numberPair: 4, subject: "МДК 01.03"  , group: "ИП236", weeks: [12,14,15,16] },

// Четверг
 {id: 20, weekDay: 4, numberPair: 1, subject: "МДК 01.03"  , group: "ИП235", weeks: [7] },
 {id: 21, weekDay: 4, numberPair: 1, subject: "МДК 09.01" , group: "ИВ234", weeks: [2,3,4,8,9,10,11,14,15,17,18,19] },
 {id: 22, weekDay: 4, numberPair: 2, subject: "МДК 01.04"  , group: "ИП235", weeks: [1,2,3,4,5,6,7,8,9,10,11,15,17] },
 {id: 23, weekDay: 4, numberPair: 2, subject: "МДК 01.04"  , group: "ИП236", weeks: [3,7] },
 {id: 24, weekDay: 4, numberPair: 3, subject: "МДК 01.04"  , group: "ИП236", weeks: [1,2,3,4,5,6,7,8,12,14,15,16,17] },
 {id: 25, weekDay: 4, numberPair: 4, subject: "МДК 01.04"  , group: "ИП232", weeks: [1,2,3,4,7,8,9,10,11] },
 {id: 26, weekDay: 4, numberPair: 4, subject: "МДК 01.04"  , group: "ИП236", weeks: [12,14,15,16,17] },
 {id: 27, weekDay: 4, numberPair: 5, subject: "МДК 01.03"  , group: "ИП236", weeks: [1,2,3,4,7,8,14,15] },

// Пятница
 {id: 28, weekDay: 5, numberPair: 1, subject: "МДК 01.04"  , group: "ИП236", weeks: [1,2,3,4,5,6,7,8,14,15,17] },
 {id: 29, weekDay: 5, numberPair: 2, subject: "МДК 01.03"  , group: "ИП235", weeks: [1,2,3,4,5,6,7,8,9,10,11,15,17] },
 {id: 30, weekDay: 5, numberPair: 3, subject: "МДК 01.03"  , group: "ИП232", weeks: [1,2,3,4,5,6,7,8,9,10,11,13,14] },
 {id: 31, weekDay: 5, numberPair: 4, subject: "МДК 01.04"  , group: "ИП232", weeks: [1,3,7] },
 {id: 32, weekDay: 5, numberPair: 4, subject: "МДК 01.04"  , group: "ИП236", weeks: [1,2,4] },
 {id: 33, weekDay: 5, numberPair: 4, subject: "МДК 01.04"  , group: "ИП235", weeks: [8,9,11] }

]

export let schedulesLSP: ScheduleTeacher[] = [

// Понедельник
{id: 34, weekDay: 1, numberPair: 1, subject: "МДК 02.01"  , group: "ИП223", weeks: [1,2,3,4,5,10] },
{id: 35, weekDay: 1, numberPair: 2, subject: "МДК 02.01"  , group: "ИП225", weeks: [1,2,3,4,5,6,8,9,10] },
{id: 36, weekDay: 1, numberPair: 2, subject: "МДК 02.01"  , group: "ИП226", weeks: [1,2,3,4,5,7,8,9,10,11] },
{id: 37, weekDay: 1, numberPair: 3, subject: "МДК 02.01" , group: "ИП222", weeks: [1,2,3,4,5,6,7,8,9,10] },
{id: 38, weekDay: 1, numberPair: 4, subject: "МДК 02.01"  , group: "ИП224", weeks: [1,2,3,4,5,6,7,9,10] },


// Вторник
{id: 39, weekDay: 2, numberPair: 1, subject: "МДК 02.01"  , group: "ИП222", weeks: [1,2,3,4,5,6,7,9,10] },
{id: 40, weekDay: 2, numberPair: 2, subject: "МДК 02.01"  , group: "ИП223", weeks: [1,2,3,4,5,6,7,8,10,11] },
{id: 41, weekDay: 2, numberPair: 3, subject: "МДК 02.01" , group: "ИП223", weeks: [10] },
{id: 42, weekDay: 2, numberPair: 3, subject: "МДК 02.01" , group: "ИП224", weeks: [1,2,3,4,5] },
{id: 43, weekDay: 2, numberPair: 4, subject: "МДК 02.01"  , group: "ИП224", weeks: [1,3,5] },
{id: 44, weekDay: 2, numberPair: 4, subject: "МДК 02.01"  , group: "ИП225", weeks: [2,4,5] },
{id: 45, weekDay: 2, numberPair: 4, subject: "МДК 02.01"  , group: "ИП226", weeks: [1,2,3,4,5,10] },
{id: 46, weekDay: 2, numberPair: 5, subject: "МДК 02.01"  , group: "ИП225", weeks: [1,2,3,4,5] },
{id: 47, weekDay: 2, numberPair: 5, subject: "МДК 02.01"  , group: "ИП226", weeks: [3,4,5] },


// Среда
{id: 48, weekDay: 3, numberPair: 1, subject: "МДК 02.01"  , group: "ИП223", weeks: [1,2,3,4,5,10] },
{id: 49, weekDay: 3, numberPair: 2, subject: "МДК 02.01"  , group: "ИП225", weeks: [1,2,3,4,5] },
{id: 50, weekDay: 3, numberPair: 2, subject: "МДК 02.01"  , group: "ИП226", weeks: [1,2,3,4,5] },
{id: 51, weekDay: 3, numberPair: 3, subject: "МДК 02.01"  , group: "ИП224", weeks: [1,2,3,4,5,10] },
{id: 52, weekDay: 3, numberPair: 3, subject: "МДК 02.01"  , group: "ИП225", weeks: [1] },
{id: 53, weekDay: 3, numberPair: 4, subject: "МДК 02.01"  , group: "ИП222", weeks: [1,2,3,4] },


// Четверг
 {id: 54, weekDay: 4, numberPair: 1, subject: "МДК 02.01"  , group: "ИП222", weeks: [1,2,3,4,5,6,7,8,9] },
 {id: 55, weekDay: 4, numberPair: 2, subject: "МДК 02.01" , group: "ИП223", weeks: [1,2,3,4,5,6,7,8,10,11] },
 {id: 56, weekDay: 4, numberPair: 3, subject: "МДК 02.01"  , group: "ИП224", weeks: [1,2,3,4,5,6,7,9,10,11] },
 {id: 57, weekDay: 4, numberPair: 4, subject: "МДК 02.01"  , group: "ИП225", weeks: [1,2,3,4,5,6,8,9,10,11] },
 {id: 58, weekDay: 4, numberPair: 4, subject: "МДК 02.01"  , group: "ИП226", weeks: [1,2,3,4,5,7,8,9,10] },


// Пятница


]

export let schedulesEIV: ScheduleTeacher[] = [

// Понедельник
{id: 59, weekDay: 1, numberPair: 1, subject: "МДК 04.02"  , group: "ИБ243", weeks: [1,2,3,4,5,6,7,8,9,10,13,14,15,16,17,18,19,20,21] },
{id: 60, weekDay: 1, numberPair: 2, subject: "МДК 04.02"  , group: "ИП242", weeks: [1,2,3,4,5,6,7,8,9,10,11,15,17] },
{id: 61, weekDay: 1, numberPair: 3, subject: "МДК 08.02" , group: "ИВ244", weeks: [1,6,14,15,19] },
{id: 62, weekDay: 1, numberPair: 4, subject: "МДК 04.02"  , group: "ИП247", weeks: [1,2,3,4,16,19] },
{id: 63, weekDay: 1, numberPair: 4, subject: "WEB"  , group: "ИB233", weeks: [1,2,3,4,11,12,13,14,15,16,17,18,19,20,21] },

// Вторник
{id: 64, weekDay: 2, numberPair: 1, subject: "МДК 08.02"  , group: "ИB244", weeks: [1,2,3,4,5,6,7,11,12,13,14,15,16,17,18,19,20] },
{id: 65, weekDay: 2, numberPair: 2, subject: "МДК 08.02"  , group: "ИB244", weeks: [1,2,3,4,5,6,7,11,12,13,14,15,16,17,18,19,20] },
{id: 66, weekDay: 2, numberPair: 3, subject: "МДК 04.02" , group: "ИП247", weeks: [1,2,3,4,5,6,7,8,9,10,16,17,19,20,21] },
{id: 67, weekDay: 2, numberPair: 4, subject: "МДК 04.02"  , group: "ИП247", weeks: [20] },
{id: 68, weekDay: 2, numberPair: 4, subject: "МДК 09.02"  , group: "ИВ234", weeks: [2,3,4,8,9,10,14,15,16,18,19] },

// Среда
{id: 69, weekDay: 3, numberPair: 1, subject: "МДК 04.02"  , group: "ИП242", weeks: [1,2,3,4,6,14,15,16,20] },
{id: 70, weekDay: 3, numberPair: 1, subject: "МДК 04.02"  , group: "ИП247", weeks: [19] },
{id: 71, weekDay: 3, numberPair: 2, subject: "МДК 04.02"  , group: "ИБ243", weeks: [1,2,3,4,6,14,15,16,19,20,21] },
{id: 72, weekDay: 3, numberPair: 3, subject: "МДК 04.02"  , group: "ИП247", weeks: [1,2,3,4,6,16,19,20] },
{id: 73, weekDay: 3, numberPair: 3, subject: "WEB"  , group: "ИБ232", weeks: [1,2,3,4,5,6,9,10,11,12,13,14,15,16,17,18,19,20,21] },
{id: 74, weekDay: 3, numberPair: 4, subject: "МДК 04.02"  , group: "ИП247", weeks: [6] },
{id: 75, weekDay: 3, numberPair: 4, subject: "МДК 09.02"  , group: "ИВ234", weeks: [1,2,3,4,8,9,10,11,12,13,14,15,16,17,18,19,20] },
{id: 76, weekDay: 3, numberPair: 5, subject: "МДК 09.02"  , group: "ИВ234", weeks: [14,15,19] },


// Четверг
 {id: 77, weekDay: 4, numberPair: 1, subject: "МДК 04.02"  , group: "ИП242", weeks: [1,2,3,4,6,7,8,9,10,11,12,13,14,15,16,20,21] },
 {id: 78, weekDay: 4, numberPair: 2, subject: "МДК 04.02"  , group: "ИП247", weeks: [1,2,3,4,5,6,7,8,9,10,11,12,16,17,18,19,20,21] },
 {id: 79, weekDay: 4, numberPair: 2, subject: "WEB"  , group: "ИБ233", weeks: [1,2,3,4,6,11,12,13,14,15,16,17,18,19,20,21] },
 {id: 80, weekDay: 4, numberPair: 3, subject: "МДК 08.02"  , group: "ИВ244", weeks: [1,2,3,4,5,6,7,11,12,13,14,15,16,17,18,19,20] },
 {id: 81, weekDay: 4, numberPair: 4, subject: "МДК 08.02"  , group: "ИВ244", weeks: [1,2,3,4,5,6,7,11,12,13,14,15,16,17,18,19,20] },

// Пятница
 {id: 82, weekDay: 5, numberPair: 1, subject: "МДК 04.02"  , group: "ИП242", weeks: [1,3,6,14,15,16] },
 {id: 83, weekDay: 5, numberPair: 1, subject: "WEB"  , group: "ИБ233", weeks: [19,20] },
 {id: 84, weekDay: 5, numberPair: 2, subject: "МДК 04.02"  , group: "ИБ243", weeks: [2,4,6,14,15,16,19,20,21] },
 {id: 85, weekDay: 5, numberPair: 3, subject: "МДК 08.02"  , group: "ИВ244", weeks: [1,2,3,4,5,6,7,14,15,16,19,20] },
 {id: 86, weekDay: 5, numberPair: 4, subject: "МДК 08.02"  , group: "ИВ244", weeks: [1,2,3,4,6,14,15,16,19,20] },
 {id: 87, weekDay: 5, numberPair: 4, subject: "МДК 09.02"  , group: "ИВ234", weeks: [20] },

]