import TodoItem from "./TodoItem";

function TodoList({
  tasks,
  deleteTask,
  toggleTask,
  editTask
}) {

  if (tasks.length === 0) {

    return (
      <div className="empty-state">

        <h2>🎉 No tasks yet</h2>

        <p>
          Add your first task above!
        </p>

      </div>
    );

  }


  return (

    <div className="todo-list">

      {tasks.map((task) => (

        <TodoItem
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          toggleTask={toggleTask}
          editTask={editTask}
        />

      ))}

    </div>

  );
}

export default TodoList;