import { useState, useEffect } from "react";
import type { ToDoItem } from "@shared/Types.ts";
import { CirclePlus } from "lucide-react";
import TodoItem from "./todoitem";
import "./toDoList.css";

const AddFields = ({
  addToDo,
}: {
  addToDo: (title: string, description: string) => void;
}) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  return (
    <div className="add-fields-container">
      <input
        type="text"
        placeholder="Add a new to-do"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className="divider"></div>
      <input
        type="text"
        placeholder="Add a new description"
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={() => addToDo(title, description)}>
        <CirclePlus />
      </button>
    </div>
  );
};

export default function ToDoList() {
  const [toDoItems, setToDoItems] = useState<ToDoItem[]>([]);

  useEffect(() => {
    fetch("/api/todo/all")
      .then((response) => response.json())
      .then((data) => setToDoItems(data))
      .catch((error) => console.error("Error fetching to-dos:", error));
    console.log("To-do items:", toDoItems);
  }, []);

  const deleteToDo = (id: number) => {
    fetch(`/api/todo/${id}`, {
      method: "DELETE",
    });
    setToDoItems(toDoItems.filter((toDoItem) => toDoItem.id !== id));
  };

  const updateToDo = (toDo: ToDoItem) => {
    console.log("Updating to-do:", toDo);
    fetch(`/api/todo/${toDo.id}`, {
      method: "PUT",
      body: JSON.stringify(toDo),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setToDoItems(toDoItems.map((item) => (item.id === toDo.id ? toDo : item)));
  };

  const addToDo = (title: string, description: string) => {
    if (title === "" || description === "") {
      console.log("Title and description are required");
      return;
    }
    const created_at = new Date();
    const updated_at = new Date();
    const toDo = {
      title: title,
      description: description,
      completed: false,
      created_at: created_at,
      updated_at: updated_at,
    };
    console.log("To-do:", toDo);
    fetch("/api/todo", {
      method: "POST",
      body: JSON.stringify(toDo),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setToDoItems([...toDoItems, data]))
      .catch((error) => console.error("Error adding to-do:", error));
  };

  useEffect(() => {
    console.log("To-do items:", toDoItems);
  }, [toDoItems]);
  return (
    <div>
      <h1>To Do List</h1>
      <AddFields addToDo={addToDo} />
      <ul>
        {toDoItems.length > 0 &&
          toDoItems.map((toDoItem) => (
            <TodoItem
              key={toDoItem.id}
              todoItem={toDoItem}
              deleteToDo={() => deleteToDo(toDoItem.id)}
              updateToDo={(item: ToDoItem) => updateToDo(item)}
            />
          ))}
      </ul>
    </div>
  );
}
