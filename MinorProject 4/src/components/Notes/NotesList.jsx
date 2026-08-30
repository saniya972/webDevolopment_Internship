import NoteCard from "./NoteCard";

function NotesList({
  notes,
  deleteNote,
  editNote
}) {

  if (notes.length === 0) {

    return (
      <div className="empty-notes">

        <h2>📒 No notes yet</h2>

        <p>
          Create your first note above!
        </p>

      </div>
    );

  }


  return (
    <div className="notes-list">

      {notes.map((note) => (

        <NoteCard
          key={note.id}
          note={note}
          deleteNote={deleteNote}
          editNote={editNote}
        />

      ))}

    </div>
  );
}

export default NotesList;