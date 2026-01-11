import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="flex flex-row items-center bg-amber-300">
            <nav className="m-2">
                <Link className="m-3 p-2 text-1xl hover:underline" to="/"> Расписание </Link>
                <Link className="m-3 p-2 text-1xl hover:underline" to="/journal"> Журнал </Link>
                <Link className="m-3 p-2 text-1xl hover:underline" to="/journal"> УП </Link>
                <Link className="m-3 p-2 text-1xl hover:underline" to="/create"> Создать пару </Link>
                <Link className="m-3 p-2 text-1xl  hover:underline" to="/journal"> Загрузить расписание </Link>
                <a className="m-3 p-2 text-1xl  hover:underline" onClick={() => console.log("Восстановить расписание")}> Восстановить расписание </a>
            </nav>
        </header >
    )
}