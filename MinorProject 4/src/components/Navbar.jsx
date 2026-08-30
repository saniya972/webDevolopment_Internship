function Navbar({ activePage, setActivePage }) {
  return (
    <nav className="navbar">

      <div
        className="logo"
        onClick={() => setActivePage("dashboard")}
      >
        🌟 Life Organizer
      </div>

      <div className="nav-links">

        <button
          className={activePage === "dashboard" ? "active" : ""}
          onClick={() => setActivePage("dashboard")}
        >
          🏠 Dashboard
        </button>

        <button
          className={activePage === "tasks" ? "active" : ""}
          onClick={() => setActivePage("tasks")}
        >
          📝 Tasks
        </button>

        <button
          className={activePage === "notes" ? "active" : ""}
          onClick={() => setActivePage("notes")}
        >
          📒 Notes
        </button>

      </div>

    </nav>
  );
}

export default Navbar;