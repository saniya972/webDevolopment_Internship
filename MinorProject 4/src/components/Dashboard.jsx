function Dashboard({ setActivePage }) {
  return (
    <section className="dashboard">

      <div className="hero">

        <h1>Welcome to Life Organizer 👋</h1>

        <p>
          Organize your tasks and notes in one simple place.
        </p>

      </div>


      <div className="dashboard-cards">

        <div className="dashboard-card">

          <div className="card-icon">
            📝
          </div>

          <h2>My Tasks</h2>

          <p>
            Manage your daily activities,
            deadlines and completed tasks.
          </p>

          <button
            onClick={() => setActivePage("tasks")}
          >
            Open Tasks →
          </button>

        </div>


        <div className="dashboard-card">

          <div className="card-icon">
            📒
          </div>

          <h2>My Notes</h2>

          <p>
            Create, edit and organize
            your important notes.
          </p>

          <button
            onClick={() => setActivePage("notes")}
          >
            Open Notes →
          </button>

        </div>

      </div>

    </section>
  );
}

export default Dashboard;