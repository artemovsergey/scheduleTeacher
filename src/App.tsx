import { useState, useEffect } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import { CreatePair } from "./components/CreatePair";
import { Journal } from "./components/Journal";
import {
  schedulesASV,
  schedulesEIV,
  schedulesIAI,
  schedulesLSP,
} from "./data/scheduleData";
import type ScheduleTeacher from "./models/schedule";
import { toast, ToastContainer } from "react-toastify";
import SemesterView from "./components/SemestrView";

export default function App() {
  const [teacher, setTeacher] = useState(() =>
    JSON.parse(localStorage.getItem("teacher") || '"asv"'),
  );
  const [currentSchedule, setCurrentSchedule] = useState<ScheduleTeacher[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);

  useEffect(() => {
    const savedWeek = localStorage.getItem("selectedWeek");
    if (savedWeek) {
      setSelectedWeek(parseInt(savedWeek));
      localStorage.removeItem("selectedWeek");
    }
  }, []);

  const handleTeacherChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newTeacher = e.target.value;
    toast("Расписание преподавателя изменено");
    setTeacher(newTeacher);
    localStorage.setItem("teacher", JSON.stringify(newTeacher));
  };

  useEffect(() => {
    const loadSchedule = () => {
      const storageKey = `schedule${teacher.toUpperCase()}`;
      const defaultSchedule =
        teacher === "asv"
          ? schedulesASV
          : teacher === "lsp"
            ? schedulesLSP
            : teacher === "eiv"
              ? schedulesEIV
              : schedulesIAI;

      try {
        const saved = localStorage.getItem(storageKey);
        if (saved) {
          setCurrentSchedule(JSON.parse(saved));
        } else {
          localStorage.setItem(storageKey, JSON.stringify(defaultSchedule));
          setCurrentSchedule(defaultSchedule);
        }
      } catch (error) {
        console.error("Ошибка загрузки расписания:", error);
        localStorage.setItem(storageKey, JSON.stringify(defaultSchedule));
        setCurrentSchedule(defaultSchedule);
      } finally {
        setIsLoading(false);
      }
    };

    setIsLoading(true);
    const timer = setTimeout(loadSchedule, 200);
    return () => clearTimeout(timer);
  }, [teacher]);

  const removePairHandler = (pair: ScheduleTeacher, weekToRemove?: number) => {
    if (!confirm(`Удалить пару "${pair.subject}" у группы ${pair.group}?`)) return;

    // Если номер недели не передан, используем selectedWeek
    const weekNumber = weekToRemove !== undefined ? weekToRemove : selectedWeek;
    
    // Если нет номера недели, ничего не делаем
    if (weekNumber === null || weekNumber === undefined) {
      toast.error("Не указана неделя для удаления");
      return;
    }

    // Создаем новое расписание, обрабатывая каждую пару
    const updatedSchedule = currentSchedule.map(p => {
      // Если это не та пара, которую нужно изменить, оставляем как есть
      if (p.id !== pair.id) return p;

      // Для нужной пары удаляем конкретную неделю
      const updatedWeeks = p.weeks.filter(w => w !== weekNumber);
      
      // Если после удаления недель массив пуст, возвращаем null (позже отфильтруем)
      if (updatedWeeks.length === 0) {
        return null;
      }
      
      // Иначе возвращаем пару с обновленным массивом недель
      return {
        ...p,
        weeks: updatedWeeks
      };
    }).filter((p): p is ScheduleTeacher => p !== null); // Удаляем все null значения

    setCurrentSchedule(updatedSchedule);

    const storageKey = `schedule${teacher.toUpperCase()}`;
    try {
      localStorage.setItem(storageKey, JSON.stringify(updatedSchedule));
      toast("Пара удалена");
    } catch (error) {
      console.error("Ошибка сохранения расписания:", error);
      alert("Не удалось сохранить изменения");
    }
  };

  const updateSchedule = (newSchedule: ScheduleTeacher[]) => {
    setCurrentSchedule(newSchedule);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center p-4">
          <div className="w-8 h-8 border-2 border-slate-300 border-t-indigo-600 rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-slate-600 text-sm">Загрузка расписания...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <HashRouter>
        <Header teacher={teacher} onChangeTeacher={handleTeacherChange} />

        <main className="flex-1 py-3 px-3 sm:px-4 md:px-6 max-w-6xl mx-auto w-full">
          <Routes>
            <Route
              path="/create"
              element={
                <CreatePair
                  teacher={teacher}
                  schedule={currentSchedule}
                  update={updateSchedule}
                />
              }
            />
            <Route
              path="/"
              element={
                <Home
                  schedules={currentSchedule}
                  onRemovePair={removePairHandler}
                  initialWeek={selectedWeek}
                />
              }
            />
            <Route
              path="/semester"
              element={<SemesterView schedules={currentSchedule} />}
            />
            <Route
              path="/journal"
              element={<Journal schedule={currentSchedule} />}
            />
            <Route
              path="*"
              element={
                <Home
                  schedules={currentSchedule}
                  onRemovePair={removePairHandler}
                  initialWeek={selectedWeek}
                />
              }
            />
          </Routes>
        </main>

        <Footer />

        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </HashRouter>
    </div>
  );
}