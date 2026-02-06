#
- https://registry.npmjs.org/

# Создание проекта

- `npm create vite@latest appname`

# Js for React

- {a,b} = bookObject
- [a,b] = bookMassiv
- [a,b, ...otherMassiv] = bookMassiv

- [...users, user1]
- `${интер}`
- a > b ? a : b
- sum(a,b) => a + b

- //falsy: 0, false, '', null, undefined
- a && b  и a || b - значения по умолчанию
- a ?? b

# Tailwind

```
npm install tailwindcss @tailwindcss/vite
```

vite.config.ts

```ts
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
})
```

```css
@import "tailwindcss";
```

# React-router-dom

- маршруты

```ts
<BrowserRouter>
        <Header />

        <Routes>
          <Route path="/sign" element={<Sign />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Home />} />
        </Routes>

        <Footer />
</BrowserRouter>
```

- программная навигация `useNavigate`
- переходы

```ts
<nav>
    <Link to="/sign"> Sign </Link>
</nav>
```

# Работа с формой

```ts
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const Sign = () => {

    const router = useNavigate()
    const [login, setLogin] = useState("Login")
    const [password, setPassword] = useState("123")

    const formHandler = (e: any) => {
        e.preventDefault();
        console.log(login, password)
        if (login == "User1") router("/")
    }

    return (
        <div className="flex flex-col w-min flex-1 m-2">
            <h1> Регистрация </h1>
            <button className="bg-amber-400 m-2 cursor-pointer" onClick={() => { router("/") }}> Home </button>

            <form className="flex flex-col m-2" onSubmit={(e) => { formHandler(e) }}>
                <input className="m-2"
                    type="text"
                    placeholder="Login"
                    value={login}
                    onChange={(e) => { setLogin(e.target.value) }} />

                <input className="m-2"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value) }}
                />
                <button className="m-2 bg-amber-300" type="submit" > Отправить </button>

            </form>

        </div>
    )
}
```

# Children Component

```ts
const Item = ({children}) => {
    return(
        <div>
            {children}
        </div>
    )
}

<Item>
    <h1> content </h1>
</Item>
```

# Поднятие состояния

- ищем первого общего предка и определяем там состояние, а потом передаем на callback в props
- Context API
- Redux, Zustand, Mobx

# Получение данных из API c помощью useEffect

```ts
    const fetchPostsHandler = () => {
        fetch("http://localhost:5188/api/Microposts")
            .then(r => r.json())
            .then(r => { console.log(r); setPosts(r) })
            .catch(() => console.log("Ошибка получения данных из API"))
    }

    async function fetchPostHandlerAsync() {
        const res = await fetch("http://localhost:5188/api/Microposts")
        const data = await res.json()
        setPosts(data)
    }

    useEffect(() => { fetchPostHandlerAsync() }, [])
```

# Инструменты

- <https://www.omdbapi.com/>
