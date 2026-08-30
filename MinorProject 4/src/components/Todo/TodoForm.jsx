import { useState } from "react";

function TodoForm({ addTask }) {

  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title.trim() === "") {
      return;
    }

    const newTask = {
      id: Date.now(),
      title: title,
      dueDate: dueDate,
      completed: false
    };

    addTask(newTask);

    setTitle("");
    setDueDate("");
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>

      <input
        type="text"
        placeholder="Enter a new task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <button type="submit">
        + Add Task
      </button>

    </form>
  );
}

export default TodoForm;