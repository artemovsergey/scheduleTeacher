// CreatePair.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type ScheduleTeacher from "../models/schedule";

export const CreatePair = ({ teacher, schedule, update }: {
  teacher: string,
  schedule: any[],
  update: (s: ScheduleTeacher[]) => void
}) => {
  const navigate = useNavigate();
  const [pair, setPair] = useState<any>({
    id: Date.now().toString(),
    weekDay: '',
    numberPair: '',
    group: '',
    subject: '',
    weeks: '',
    status: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!pair.weekDay || isNaN(Number(pair.weekDay)) || Number(pair.weekDay) < 1 || Number(pair.weekDay) > 5) {
      newErrors.weekDay = "1-5";
    }

    if (!pair.numberPair || isNaN(Number(pair.numberPair)) || Number(pair.numberPair) < 1 || Number(pair.numberPair) > 6) {
      newErrors.numberPair = "1-6";
    }

    if (!pair.group.trim()) newErrors.group = "Обязательно";
    if (!pair.subject.trim()) newErrors.subject = "Обязательно";
    if (!pair.weeks.trim()) newErrors.weeks = "Например: 1,3,5";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formHandler = (e: any) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newPair = {
      ...pair,
      weeks: pair.weeks.split(',').map((w: string) => parseInt(w.trim()))
    };

    const storageKey = `schedule${teacher.toUpperCase()}`;
    const updatedSchedule = [...schedule, newPair];
    localStorage.setItem(storageKey, JSON.stringify(updatedSchedule));
    update(updatedSchedule);
    navigate('/');
  };

  const handleChange = (field: string, value: string) => {
    setPair((prev: any) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="py-2">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
          <h1 className="text-lg font-semibold text-slate-800 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Добавить пару
          </h1>
        </div>

        <form onSubmit={formHandler} className="p-4 space-y-4">
          {[
            { label: "День недели", field: "weekDay", type: "number", placeholder: "1-5" },
            { label: "Номер пары", field: "numberPair", type: "number", placeholder: "1-6" },
            { label: "Группа", field: "group", type: "text", placeholder: "ИП232" },
            { label: "Предмет", field: "subject", type: "text", placeholder: "Название предмета" },
            { label: "Недели", field: "weeks", type: "text", placeholder: "1,3,5,7" },
            { label: "Статус", field: "status", type: "text", placeholder: "Необязательно" }
          ].map((input, idx) => (
            <div key={idx} className="space-y-1">
              <label className="block text-sm font-medium text-slate-700">{input.label}</label>
              <input
                type={input.type}
                placeholder={input.placeholder}
                value={pair[input.field as keyof typeof pair]}
                onChange={(e) => handleChange(input.field, e.target.value)}
                className={`w-full px-3.5 py-2.5 rounded-lg border ${errors[input.field]
                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                    : 'border-slate-300 focus:ring-indigo-500 focus:border-indigo-500'
                  } bg-white text-slate-900 transition-colors`}
                required={input.field !== 'status'}
              />
              {errors[input.field] && (
                <p className="text-[0.75rem] text-red-500 mt-1">{errors[input.field]}</p>
              )}
            </div>
          ))}

          <div className="flex flex-col sm:flex-row sm:gap-3 pt-2">
            <button
              type="submit"
              className="w-full sm:flex-1 py-2.5 bg-indigo-600 text-white font-medium rounded-lg 
                hover:bg-indigo-700 active:opacity-90 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Добавить пару
            </button>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-full sm:flex-1 mt-2 sm:mt-0 py-2.5 border border-slate-300 text-slate-700 rounded-lg font-medium
                hover:bg-slate-50 active:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
            >
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreatePair