import { useEffect, useState } from "react";

import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

function TodoApp() {

  // LOAD TASKS FROM LOCAL STORAGE
  const [tasks, setTasks] = useState(() => {

    const savedTasks = localStorage.getItem("tasks");

    return savedTasks
      ? JSON.parse(savedTasks)
      : [];

  });


  const [filter, setFilter] = useState("all");


  // SAVE TASKS TO LOCAL STORAGE
  useEffect(() => {

    localStorage.setItem(
      "tasks",
      JSON.stringify(tasks)
    );

  }, [tasks]);


  // ADD TASK
  const addTask = (task) => {

    setTasks([
      ...tasks,
      task
    ]);

  };


  // DELETE TASK
  const deleteTask = (id) => {

    setTasks(
      tasks.filter((task) => task.id !== id)
    );

  };


  // COMPLETE / UNCOMPLETE TASK
  const toggleTask = (id) => {

    setTasks(

      tasks.map((task) =>

        task.id === id

          ? {
              ...task,
              completed: !task.completed
            }

          : task

      )

    );

  };


  // EDIT TASK
  const editTask = (id, newTitle) => {

    setTasks(

      tasks.map((task) =>

        task.id === id

          ? {
              ...task,
              title: newTitle
            }

          : task

      )

    );

  };


  // FILTER TASKS
  const filteredTasks = tasks.filter((task) => {

    if (filter === "completed") {
      return task.completed;
    }

    if (filter === "pending") {
      return !task.completed;
    }

    return true;

  });


  return (

    <section className="todo-section">

      <div className="page-header">

        <h1>📝 My Tasks</h1>

        <p>
          Manage your daily tasks and deadlines.
        </p>

      </div>


      <TodoForm
        addTask={addTask}
      />


      <div className="filters">

        <button
          className={
            filter === "all"
              ? "selected"
              : ""
          }
          onClick={() => setFilter("all")}
        >
          All
        </button>


        <button
          className={
            filter === "pending"
              ? "selected"
              : ""
          }
          onClick={() => setFilter("pending")}
        >
          Pending
        </button>


        <button
          className={
            filter === "completed"
              ? "selected"
              : ""
          }
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>

      </div>


      <TodoList
        tasks={filteredTasks}
        deleteTask={deleteTask}
        toggleTask={toggleTask}
        editTask={editTask}
      />

    </section>

  );
}

export default TodoApp;