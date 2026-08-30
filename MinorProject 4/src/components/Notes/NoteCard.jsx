import { useState } from "react";

function NoteCard({
  note,
  deleteNote,
  editNote
}) {

  const [editing, setEditing] = useState(false);

  const [title, setTitle] =
    useState(note.title);

  const [content, setContent] =
    useState(note.content);

  const [category, setCategory] =
    useState(note.category);


  const handleSave = () => {

    if (
      title.trim() === "" ||
      content.trim() === ""
    ) {
      return;
    }

    editNote(
      note.id,
      title,
      content,
      category
    );

    setEditing(false);
  };


  return (

    <div className="note-card">

      {editing ? (

        <>
          <input
            className="note-edit-title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
          />

          <textarea
            className="note-edit-content"
            value={content}
            onChange={(e) =>
              setContent(e.target.value)
            }
            rows="5"
          />

          <select
            className="note-edit-category"
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
          >
            <option value="Personal">
              Personal
            </option>

            <option value="Study">
              Study
            </option>

            <option value="Work">
              Work
            </option>

            <option value="Ideas">
              Ideas
            </option>
          </select>


          <div className="note-actions">

            <button onClick={handleSave}>
              💾 Save
            </button>

            <button
              onClick={() => setEditing(false)}
            >
              ❌ Cancel
            </button>

          </div>
        </>

      ) : (

        <>

          <div className="note-top">

            <h2>{note.title}</h2>

            <span className="category">
              {note.category}
            </span>

          </div>


          <p>{note.content}</p>


          <small className="note-time">
            🕐 {note.createdAt}
          </small>


          <div className="note-actions">

            <button
              onClick={() => setEditing(true)}
            >
              ✏️ Edit
            </button>

            <button
              onClick={() =>
                deleteNote(note.id)
              }
            >
              🗑️ Delete
            </button>

          </div>

        </>

      )}

    </div>
  );
}

export default NoteCard;