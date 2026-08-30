import { useState } from "react";

function NoteForm({ addNote }) {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Personal");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title.trim() === "" || content.trim() === "") {
      return;
    }

    const newNote = {
      id: Date.now(),
      title: title,
      content: content,
      category: category,
      createdAt: new Date().toLocaleString()
    };

    addNote(newNote);

    setTitle("");
    setContent("");
    setCategory("Personal");
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>

      <input
        type="text"
        placeholder="Note title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Write your note..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows="5"
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="Personal">Personal</option>
        <option value="Study">Study</option>
        <option value="Work">Work</option>
        <option value="Ideas">Ideas</option>
      </select>

      <button type="submit">
        + Add Note
      </button>

    </form>
  );
}

export default NoteForm;