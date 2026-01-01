import { useState, useEffect } from "react";
import type { ToDoItem } from "@shared/Types.ts";

export default function ToDoList() {

    const [toDos, setToDos] = useState<ToDoItem[]>([]);

    useEffect(() => {
        fetch("http://localhost:3000/api/todo/all")
            .then(response => response.json())
            .then(data => setToDos(data))
            .catch(error => console.error("Error fetching to-dos:", error));
    }
    , [toDos]);

    const addToDo = () => {
        console.log("Adding to-do");
        const title = (document.getElementById("title") as HTMLInputElement)?.value || "testing title";
        const description = (document.getElementById("description") as HTMLInputElement)?.value || "testing description";
        const completed = (document.getElementById("completed") as HTMLInputElement)?.checked || false;
        const created_at = new Date();
        const updated_at = new Date();
        const toDo = { title: title, description: description, completed: completed, created_at: created_at, updated_at: updated_at };
        console.log("To-do:", toDo);
        fetch("http://localhost:3000/api/todo", {
            method: "POST",
            body: JSON.stringify(toDo),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => setToDos([...toDos, data]))
        .catch(error => console.error("Error adding to-do:", error));
    }
    return (
        <div>
            <h1>To Do List</h1>
            <ul>
            { toDos.length > 0 && toDos.map((toDo) => (
                    <li key={toDo.id}>{toDo.title} - {toDo.description} - {toDo.completed ? "Completed" : "Not Completed"} </li>
                ))}
            </ul>
            <input type="text" placeholder="Add a new to-do" id="title" />
            <input type="text" placeholder="Add a new to-do" id="description" />
            <input type="checkbox" id="completed" />
            <button onClick={() => addToDo()}>Add</button>
        </div>
    )
}