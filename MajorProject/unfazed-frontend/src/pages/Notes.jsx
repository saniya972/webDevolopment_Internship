
import { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import api from "../api/axios";

function Notes() {
    const [clients, setClients] = useState([]);
    const [clientId, setClientId] = useState("");
    const [type, setType] = useState("private");
    const [notes, setNotes] = useState([]);

    const editor = useEditor({
        extensions: [StarterKit],
        content: ""
    });

    // Get clients
    const getClients = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await api.get("/clients", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setClients(response.data.clients);
        } catch (error) {
            console.log(error);
        }
    };

    // Get saved notes
    const getNotes = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await api.get("/session-notes", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setNotes(response.data.notes);
        } catch (error) {
            console.log(error);
        }
    };

    // Save note
    const saveNote = async () => {
        if (!clientId || !editor || editor.isEmpty) {
            alert("Please select a client and write a note");
            return;
        }

        try {
            const token = localStorage.getItem("token");

            await api.post(
                "/session-notes",
                {
                    clientId,
                    content: editor.getHTML(),
                    type
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Note saved successfully");

            editor.commands.clearContent();
            setType("private");

            getNotes();
        } catch (error) {
            console.log(error);
            alert("Failed to save note");
        }
    };

    useEffect(() => {
        getClients();
        getNotes();
    }, []);

    return (
        <div className="notes-page">

            {/* Page Header */}
            <div className="notes-header">
                <div>
                    <span className="notes-tag">
                        THERAPY DOCUMENTATION
                    </span>

                    <h1>Session Notes</h1>

                    <p>
                        Create, organize and review your
                        client session notes securely.
                    </p>
                </div>

                <div className="notes-header-icon">
                    📝
                </div>
            </div>

            {/* Create Note Card */}
            <div className="notes-create-card">

                <div className="notes-section-heading">
                    <div className="notes-heading-icon">
                        ✍️
                    </div>

                    <div>
                        <h2>Create Session Note</h2>
                        <p>
                            Record important details from your
                            therapy sessions.
                        </p>
                    </div>
                </div>

                {/* Client Selection */}
                <div className="notes-form-group">
                    <label>Select Client</label>

                    <select
                        className="notes-select"
                        value={clientId}
                        onChange={(e) =>
                            setClientId(e.target.value)
                        }
                    >
                        <option value="">Select Client</option>

                        {clients.map((client) => (
                            <option
                                key={client._id}
                                value={client._id}
                            >
                                {client.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Editor */}
                <div className="notes-editor-card">

                    <div className="notes-editor-toolbar">
                        <span className="notes-toolbar-label">
                            Formatting
                        </span>

                        <div className="notes-toolbar-buttons">
                            <button
                                type="button"
                                className={
                                    editor?.isActive("bold")
                                        ? "notes-tool-button active"
                                        : "notes-tool-button"
                                }
                                disabled={!editor}
                                onClick={() =>
                                    editor?.chain()
                                        .focus()
                                        .toggleBold()
                                        .run()
                                }
                            >
                                <strong>B</strong>
                            </button>

                            <button
                                type="button"
                                className={
                                    editor?.isActive("italic")
                                        ? "notes-tool-button active"
                                        : "notes-tool-button"
                                }
                                disabled={!editor}
                                onClick={() =>
                                    editor?.chain()
                                        .focus()
                                        .toggleItalic()
                                        .run()
                                }
                            >
                                <em>I</em>
                            </button>

                            <button
                                type="button"
                                className={
                                    editor?.isActive("bulletList")
                                        ? "notes-tool-button active"
                                        : "notes-tool-button"
                                }
                                disabled={!editor}
                                onClick={() =>
                                    editor?.chain()
                                        .focus()
                                        .toggleBulletList()
                                        .run()
                                }
                            >
                                • List
                            </button>

                            <button
                                type="button"
                                className={
                                    editor?.isActive("heading", {
                                        level: 2
                                    })
                                        ? "notes-tool-button active"
                                        : "notes-tool-button"
                                }
                                disabled={!editor}
                                onClick={() =>
                                    editor?.chain()
                                        .focus()
                                        .toggleHeading({
                                            level: 2
                                        })
                                        .run()
                                }
                            >
                                H2
                            </button>
                        </div>
                    </div>

                    <div className="notes-editor-content">
                        <EditorContent editor={editor} />
                    </div>

                </div>

                {/* Note Type */}
                <div className="notes-form-group notes-type-group">
                    <label>Note Visibility</label>

                    <select
                        className="notes-select"
                        value={type}
                        onChange={(e) =>
                            setType(e.target.value)
                        }
                    >
                        <option value="private">
                            Private Note
                        </option>

                        <option value="shared">
                            Shared Note
                        </option>
                    </select>

                    <span className="notes-helper-text">
                        Choose whether the note is private
                        or shared.
                    </span>
                </div>

                {/* Save Button */}
                <div className="notes-save-row">
                    <button
                        type="button"
                        className="notes-save-button"
                        onClick={saveNote}
                    >
                        <span>💾</span> Save Note
                    </button>
                </div>
            </div>

            {/* Saved Notes */}
            <div className="notes-saved-section">

                <div className="notes-saved-header">
                    <div>
                        <h2>Saved Notes</h2>
                        <p>
                            Your previously saved session records.
                        </p>
                    </div>

                    <span className="notes-count">
                        {notes.length} Notes
                    </span>
                </div>

                {notes.length === 0 ? (
                    <div className="notes-empty-state">
                        <div className="notes-empty-icon">
                            📋
                        </div>

                        <h3>No notes available</h3>

                        <p>
                            Your saved session notes will
                            appear here.
                        </p>
                    </div>
                ) : (
                    <div className="notes-list">
                        {notes.map((note) => (
                            <div
                                key={note._id}
                                className="notes-item-card"
                            >
                                <div className="notes-item-header">
                                    <div className="notes-item-title">
                                        <span className="notes-item-icon">
                                            📝
                                        </span>

                                        <div>
                                            <h3>Session Note</h3>

                                            <p>
                                                {new Date(
                                                    note.createdAt
                                                ).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>

                                    <span
                                        className={`notes-type-badge ${
                                            note.type === "shared"
                                                ? "shared"
                                                : "private"
                                        }`}
                                    >
                                        {note.type === "shared"
                                            ? "Shared"
                                            : "Private"}
                                    </span>
                                </div>

                                <div
                                    className="notes-item-content"
                                    dangerouslySetInnerHTML={{
                                        __html: note.content
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Notes;