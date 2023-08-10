import { useState } from "react";
import "./main.css";
import { FC } from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { red } from "@mui/material/colors";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


interface Todos {
    text: string,
    status: string
}



const Main: FC = () => {

    const [inputValue, setInputValue] = useState<string>("");
    const [todos, setTodos] = useState<Todos[]>([]);
    const [update, setUpdate] = useState<number>(0);
    const [toggle, setToggle] = useState<boolean>(false)
    const [selectedValue , setSelectedValue] = useState<string>("all");


    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e: React.ChangeEvent<HTMLInputElement>) => {
        const todo = e.target.value;
        setInputValue(todo)

        // setTodos((prev) =>
        //     [...prev, todo]
        // );
        //setTodos(todo)

    }

    const handleDelete = (clickedTodo: Todos) => {
        const updatedTodos = todos.filter((alltodos) => alltodos !== clickedTodo)
        setTodos(updatedTodos);

    }

    const handleCompleted = (clickedTodo: Todos) => {
        setTodos(prevTodos =>
            prevTodos.map(todo =>
                todo === clickedTodo ? { ...todo, status: 'completed' } : todo
            )
        );
    };

    const handleEdit = (clickedTodo: Todos, index: number) => {
        setInputValue(clickedTodo.text)
        setUpdate(index);
        setToggle(true)
    }

    const handleUpdate = () => {
        // setTodos((prev) => [...prev , {text : inputValue , isFalse : false}])
        // console.log(update)
        // todos.splice(update,1,{...todos[update],text : inputValue});
        // console.log(todos)
        // setTodos(todos)


        const updatedTodos = [...todos];
        updatedTodos[update] = { ...updatedTodos[update], text: inputValue };
        setTodos(updatedTodos);
    };



    const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedValue(event.target.value)
    }






    const handleSubmit: () => void = () => {
        if (inputValue.trim() === "") {
            alert("Enter a valid Input !!")
        }
        else {
            setTodos((prev) => [...prev, { text: inputValue, status: 'incompleted' }])
            setInputValue("")
        }
    }

    return (
        <div className="main-container">
            <div className="container">
                <header>
                    <h1 className="heading">Todo App...</h1>
                </header>


                <div className="inputs">
                    <input type="text" value={inputValue} className="todo-input" placeholder="Enter the Task....." onChange={(e) => handleChange(e)} />
                    {
                        toggle ?
                            <button className="btn" onClick={handleUpdate}>Update</button>
                            :
                            <button className="btn" onClick={handleSubmit}>Submit</button>


                    }
                </div>


                <div className="select">
                    <select name="todos" onChange={handleFilterChange}>
                        <option value="all">All</option>
                        <option value="completed">Completed</option>
                        <option value="incompleted">Incompleted</option>
                    </select>
                </div>


                <div className="todocontainerparent">
                    <ul>
                        {
                            todos.filter((value) => selectedValue==='all'||value.status===selectedValue).map((todo: Todos, index: number) => {
                                return (
                                    <div className="list-items" key={index}>
                                        <li className={`list ${todo.status==='completed' ? "iconBtnDone" : ""}`}>{todo.text}</li>
                                        <div className="buttons">
                                            <button className="icon-btn" onClick={() => handleCompleted(todo)}><CheckCircleIcon fontSize="large" sx={{ fontSize: 40 }} /></button>
                                            <button onClick={() => handleEdit(todo, index)}><EditIcon fontSize="large" color="primary" /></button>
                                            <button onClick={() => handleDelete(todo)}><DeleteIcon fontSize="large" sx={{ color: red[500] }} /></button>
                                        </div>
                                    </div>
                                )
                            })}
                    </ul>
                </div>

            </div>
        </div>
    )
}

export default Main;