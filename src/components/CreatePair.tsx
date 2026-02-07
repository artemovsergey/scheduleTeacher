// CreatePair.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type ScheduleTeacher from "../models/schedule";

export const CreatePair = ({
  teacher,
  schedule,
  update
}: {
  teacher: string,
  schedule: ScheduleTeacher[],
  update: (newSchedule: ScheduleTeacher[]) => void
}) => {
  const navigate = useNavigate();

  const [day, setDay] = useState(1);
  const [numberPair, setNumberPair] = useState(1);
  const [group, setGroup] = useState("");
  const [subject, setSubject] = useState("");

  const daysOfWeek = [
    { value: 1, label: "Понедельник" },
    { value: 2, label: "Вторник" },
    { value: 3, label: "Среда" },
    { value: 4, label: "Четверг" },
    { value: 5, label: "Пятница" }
  ];

  // Фильтруем группы и предметы только для выбранного преподавателя
  const teacherGroups = Array.from(new Set(schedule.map(p => p.group)));
  const teacherSubjects = Array.from(new Set(schedule.map(p => p.subject)));

  useEffect(() => {
    setGroup(teacherGroups[0] || "");
    setSubject(teacherSubjects[0] || "");
  }, [teacherGroups, teacherSubjects]);

  const handleAddPair = () => {
    if (!group || !subject) return;

    const newPair: ScheduleTeacher = {
      id: Date.now().toString(), // простое уникальное id
      weekDay: day,
      numberPair,
      group,
      subject,
      status: "замена",
      weeks: [1] // по умолчанию первая неделя, можно расширить
    };

    const newSchedule = [...schedule, newPair];
    update(newSchedule);

    // Сохраняем в localStorage
    const storageKey = `schedule${teacher.toUpperCase()}`;
    localStorage.setItem(storageKey, JSON.stringify(newSchedule));

    navigate("/"); // возвращаемся на расписание
  };

  return (
    <div className="max-w-md mx-auto mt-8 bg-white p-6 rounded-xl shadow-md border border-slate-200">
      <h2 className="text-xl font-semibold text-slate-800 mb-4 text-center">Добавить пару</h2>

      {/* День недели */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-700 mb-1">День недели</label>
        <select
          value={day}
          onChange={(e) => setDay(Number(e.target.value))}
          className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        >
          {daysOfWeek.map(d => (
            <option key={d.value} value={d.value}>{d.label}</option>
          ))}
        </select>
      </div>

      {/* Номер пары */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-700 mb-1">Номер пары</label>
        <select
          value={numberPair}
          onChange={(e) => setNumberPair(Number(e.target.value))}
          className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        >
          {[1, 2, 3, 4, 5, 6].map(n => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
      </div>

      {/* Группа */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-700 mb-1">Группа</label>
        <select
          value={group}
          onChange={(e) => setGroup(e.target.value)}
          className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        >
          {teacherGroups.map(g => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
      </div>

      {/* Предмет */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-700 mb-1">Предмет</label>
        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        >
          {teacherSubjects.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <button
        onClick={handleAddPair}
        className="w-full py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors"
      >
        Добавить пару
      </button>
    </div>
  )
}
