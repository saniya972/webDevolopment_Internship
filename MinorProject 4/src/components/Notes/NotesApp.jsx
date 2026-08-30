import { useEffect, useState } from "react";
import NoteForm from "./NoteForm";
import NotesList from "./NotesList";

function NotesApp() {

  // LOAD NOTES FROM LOCAL STORAGE
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  const [search, setSearch] = useState("");

  // SAVE NOTES WHENEVER NOTES CHANGE
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // ADD NOTE
  const addNote = (note) => {
    setNotes([...notes, note]);
  };

  // DELETE NOTE
  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  // EDIT NOTE
  const editNote = (id, newTitle, newContent, newCategory) => {
    setNotes(
      notes.map((note) =>
        note.id === id
          ? {
              ...note,
              title: newTitle,
              content: newContent,
              category: newCategory,
            }
          : note
      )
    );
  };

  // SEARCH
  const filteredNotes = notes.filter((note) => {
    const text = search.toLowerCase();

    return (
      note.title.toLowerCase().includes(text) ||
      note.content.toLowerCase().includes(text) ||
      note.category.toLowerCase().includes(text)
    );
  });

  return (
    <section className="notes-section">
      <div className="page-header">
        <h1>📒 My Notes</h1>
        <p>Create and organize your notes.</p>
      </div>

      <NoteForm addNote={addNote} />

      <div className="note-search">
        <input
          type="text"
          placeholder="🔍 Search notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <NotesList
        notes={filteredNotes}
        deleteNote={deleteNote}
        editNote={editNote}
      />
    </section>
  );
}

export default NotesApp;