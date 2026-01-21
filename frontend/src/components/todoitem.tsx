import type { ToDoItem } from "@shared/Types.ts";
import { useState } from "react";
import {
  Trash,
  CalendarPlus,
  CalendarClock,
  CheckSquare,
  Circle,
  Pencil,
} from "lucide-react";
import "./todoitem.css";
import { EditingActions } from "./editingActions";
import { EditableText } from "./editableText";

export const DateFormatter = ({ date }: { date: Date }) => {
  return (
    <div className="date-formatter">
      <div className="date-formatter-short">
        {date.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
        })}
      </div>
      <div className="date-formatter-full">
        {date.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </div>
    </div>
  );
};

export const ToDoDescription = ({
  tempTitle,
  tempDescription,
  updateToDo,
  onChangeTitle,
  onChangeDescription,
  editMode,
}: {
  tempTitle: string;
  tempDescription: string;
  updateToDo: () => void;
  editMode: boolean;
  onChangeTitle: (text: string) => void;
  onChangeDescription: (text: string) => void;
}) => {
  return (
    <div className="todo-item-description-container">
      <div className="todo-item-title-container">
        <EditableText
          text={tempTitle}
          onSave={onChangeTitle}
          editMode={editMode}
          onChange={onChangeTitle}
        />
      </div>
      <EditableText
        text={tempDescription}
        onSave={updateToDo}
        editMode={editMode}
        onChange={onChangeDescription}
      />
    </div>
  );
};
export default function TodoItem({
  todoItem,
  deleteToDo,
  updateToDo,
}: {
  todoItem: ToDoItem;
  deleteToDo: () => void;
  updateToDo: (item: ToDoItem) => void;
}) {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [tempTitle, setTempTitle] = useState<string>(todoItem.title);
  const [tempDescription, setTempDescription] = useState<string>(
    todoItem.description
  );
  const handleChangeTitle = (text: string) => {
    setTempTitle(text);
  };
  const handleChangeDescription = (text: string) => {
    setTempDescription(text);
  };
  const toggleCompleted = () => {
    console.log("Toggling completed");
    console.log("Todo item:", todoItem);
    if (editMode) {
      return;
    }
    updateToDo({ ...todoItem, completed: !todoItem.completed });
  };
  const handleSave = () => {
    setEditMode(false);
    updateToDo({ ...todoItem, title: tempTitle, description: tempDescription });
  };

  const handleCancel = () => {
    setEditMode(false);
    setTempTitle(todoItem.title);
    setTempDescription(todoItem.description);
  };
  const handleUpdateCols = () => {
    updateToDo({ ...todoItem, title: tempTitle, description: tempDescription });
  };
  return (
    <div>
      <div
        className={`todo-item-container ${
          todoItem.completed ? "to-do-completed" : "to-do-not-completed"
        }`}
        onClick={toggleCompleted}
      >
        <div className="todo-item-completed-icon-wrapper">
          {todoItem.completed ? (
            <CheckSquare size={24} />
          ) : (
            <Circle size={24} />
          )}
        </div>
        <div className="todo-item-info-wrapper">
          <ToDoDescription
            tempTitle={tempTitle}
            tempDescription={tempDescription}
            updateToDo={handleUpdateCols}
            editMode={editMode}
            onChangeTitle={handleChangeTitle}
            onChangeDescription={handleChangeDescription}
          />

          <div className="todo-item-date-container">
            <div className="todo-item-created-at">
              <>
                <CalendarPlus size={14} />
                <DateFormatter date={new Date(todoItem.created_at)} />
              </>
            </div>
            <div className="todo-item-updated-at">
              <>
                <CalendarClock size={14} />
                <DateFormatter
                  date={new Date(todoItem.updated_at || new Date())}
                />
              </>
            </div>
          </div>
        </div>
        <div className="todo-item-actions-wrapper">
          <button type="button" onClick={() => deleteToDo()}>
            <Trash />
          </button>
          {editMode ? (
            <EditingActions
              handleSave={handleSave}
              handleCancel={handleCancel}
            />
          ) : (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setEditMode(true);
              }}
            >
              <Pencil />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
