import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./components/Home"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { CreatePair } from "./components/CreatePair"
import { Journal } from "./components/Journal"

export default function App() {

  return (
    <div className="flex flex-col h-screen" >

      <BrowserRouter basename="/scheduleTeacher">
        <Header />

        <Routes>
          <Route path="/create" element={<CreatePair />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Home />} />
          <Route path="/journal" element={<Journal />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  )
}