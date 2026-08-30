
import { useState } from "react";

import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import TodoApp from "./components/Todo/TodoApp";
import NotesApp from "./components/Notes/NotesApp";

import "./styles.css";

function App() {

  const [activePage, setActivePage] = useState("dashboard");

  return (
    <div className="app">

      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <main className="container">

        {activePage === "dashboard" && (
          <Dashboard setActivePage={setActivePage} />
        )}

        {activePage === "tasks" && (
          <TodoApp />
        )}

       {activePage === "notes" && (
  <NotesApp />
)}

      </main>

    </div>
  );
}

export default App;