import { useState } from "react";

function TodoItem({
  task,
  deleteTask,
  toggleTask,
  editTask
}) {

  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);


  const handleSave = () => {

    if (title.trim() === "") {
      return;
    }

    editTask(task.id, title);

    setEditing(false);
  };


  return (
    <div
      className={`todo-item ${
        task.completed ? "completed" : ""
      }`}
    >

      <div className="task-left">

        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task.id)}
        />


        <div className="task-content">

          {editing ? (

            <input
              className="edit-input"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
            />

          ) : (

            <h3>{task.title}</h3>

          )}


          {task.dueDate && (
            <small>
              📅 Due: {task.dueDate}
            </small>
          )}

        </div>

      </div>


      <div className="task-actions">

        {editing ? (

          <>
            <button onClick={handleSave}>
              💾 Save
            </button>

            <button
              onClick={() => {
                setTitle(task.title);
                setEditing(false);
              }}
            >
              ❌ Cancel
            </button>
          </>

        ) : (

          <>
            <button
              onClick={() => setEditing(true)}
            >
              ✏️ Edit
            </button>

            <button
              onClick={() => deleteTask(task.id)}
            >
              🗑️ Delete
            </button>
          </>

        )}

      </div>

    </div>
  );
}

export default TodoItem;