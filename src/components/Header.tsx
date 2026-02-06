import { Link } from "react-router-dom";

export default function Header(props: { teacher: string, onChangeTeacher: (e: React.ChangeEvent<HTMLSelectElement>) => void }) {

    return (
        <header className="flex flex-row items-center bg-amber-300">
            <nav className="m-2">
                <Link className="m-3 p-2 text-1xl hover:underline" to="/"> Расписание </Link>
                <Link className="m-3 p-2 text-1xl hover:underline" to="/journal"> Журнал </Link>
                <Link className="m-3 p-2 text-1xl hover:underline" to="/create"> Создать пару </Link>
            </nav>
            <select className="ml-auto m-2 p-2 text-1xl border-2 border-black rounded"
                onChange={(e) => props.onChangeTeacher(e)}
            >
                <option value="asv"  > Артемов С. В. </option>
                <option value="lsp" > Лукьянова С. П. </option>
                <option value="eiv" > Еремина И. В. </option>
            </select>
        </header >
    )
}