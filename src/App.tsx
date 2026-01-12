import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./components/Home"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { CreatePair } from "./components/CreatePair"
import { Journal } from "./components/Journal"
import { useEffect, useState } from "react"
import { schedulesASV, schedulesEIV, schedulesLSP } from "./data/scheduleData"
import type ScheduleTeacher from "./models/schedule"


export default function App() {

  const [teacher, setTeacher] = useState("asv");
  const [currentSchedule, setCurrentSchedule] = useState<ScheduleTeacher[]>([])

  const handleTeacherChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTeacher(e.target.value);
    localStorage.setItem("teacher", JSON.stringify(e.target.value));
  };

  useEffect(() => {
    let schedules: ScheduleTeacher[]
    if (teacher == 'asv') {
      if (localStorage.getItem("scheduleASV")) {
        schedules = JSON.parse(localStorage.getItem("scheduleASV") || '{}')
      } else {
        schedules = schedulesASV
        localStorage.setItem("scheduleASV", JSON.stringify(schedulesASV))
      }
    }
    else if (teacher == 'lsp') {
      if (localStorage.getItem("scheduleLSP")) {
        schedules = JSON.parse(localStorage.getItem("scheduleLSP") || '{}')
      } else {
        schedules = schedulesLSP
        localStorage.setItem("scheduleLSP", JSON.stringify(schedulesLSP))
      }
    } else {
      if (localStorage.getItem("scheduleEIV")) {
        schedules = JSON.parse(localStorage.getItem("scheduleEIV") || '{}')
      } else {
        schedules = schedulesEIV
        localStorage.setItem("scheduleEIV", JSON.stringify(schedulesEIV))
      }
    }
    setCurrentSchedule(schedules)
  }, [teacher]);

  const removePairHandler = (pair: ScheduleTeacher) => {
    const result: boolean = confirm(`Вы согласны снять пару ${pair.subject} в группе ${pair.group} ?`);
    if (result) {

      let schedule = currentSchedule.filter(p => p.id != pair.id)

      switch (teacher) {
        case 'asv':
          localStorage.setItem("scheduleASV", JSON.stringify(schedule))
          break;
        case 'lsp':
          localStorage.setItem("scheduleLSP", JSON.stringify(schedule))
          break;
        case 'eiv':
          localStorage.setItem("scheduleEIV", JSON.stringify(schedule))
          break;
      }
      setCurrentSchedule(schedule)
    } else {
      console.log("Пользователь выбрал Нет/Отмена");
    }
  }

  const updateSchedule = (s: ScheduleTeacher[]) => {
    setCurrentSchedule(s)
  }

  return (
    <div className="flex flex-col h-screen" >

      <BrowserRouter basename="/scheduleTeacher" >
        <Header teacher={teacher} onChangeTeacher={handleTeacherChange} />

        <Routes >
          <Route path="/create" element={<CreatePair teacher={teacher} schedule={currentSchedule} update={updateSchedule} />} />
          <Route path="/" element={<Home schedules={currentSchedule} onRemovePair={removePairHandler} />} />
          <Route path="*" element={<Home schedules={currentSchedule} onRemovePair={removePairHandler} />} />
          <Route path="/journal" element={<Journal schedule={currentSchedule} />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  )
}