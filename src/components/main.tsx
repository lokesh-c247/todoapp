import { useState } from "react";
import "./main.css";
import { FC } from "react";



const Main: FC = () => {

    const [inputValue, setInputValue] = useState<string>("")
    const [todos, setTodos] = useState<string[]>([])
    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e: React.ChangeEvent<HTMLInputElement>) => {
        const todo = e.target.value;
        // setTodos((prev) =>
        //     [...prev, todo]
        // );
        //setTodos(todo)
        setInputValue(todo)

    }

    const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = () => {
        setTodos((prev) => [...prev, inputValue])
        setInputValue("")
    }

    return (
        <div className="main-container">
            <div className="container">
                <header>
                    <h1 className="heading">Todo App...</h1>
                </header>


                <div className="inputs">
                    <input type="text" value = {inputValue} className="todo-input" placeholder="Enter the Task....." onChange={(e) => handleChange(e)} />
                    <button className="btn" onClick={handleSubmit}>Submit</button>
                </div>


                <div className="select">
                    <select name="todos">
                        <option value="all">All</option>
                        <option value="completed">Completed</option>
                        <option value="incompleted">Incompleted</option>
                    </select>
                </div>


                <div className="todocontainer">
                    <ul>
                        {
                            todos.map((todo: string) => {
                                return (
                                    <><li className="list">{todo}</li></>
                                )
                            })
                        }
                    </ul>
                </div>








            </div>
        </div>
    )
}

export default Main;