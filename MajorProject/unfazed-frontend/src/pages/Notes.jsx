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
        extensions: [
            StarterKit
        ],
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

            console.log(response.data.notes);

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
        <div style={{ width: "100%" }}>

            <h1>Session Notes</h1>

            {/* Client Selection */}

            <select
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
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

            <br />
            <br />

            {/* Editor */}

            <div
                style={{
                    border: "1px solid black",
                    minHeight: "200px",
                    padding: "10px",
                    width: "100%",
                    boxSizing: "border-box"
                }}
            >

                {/* Formatting Buttons */}

                <div style={{ marginBottom: "10px" }}>

                    <button
                        onClick={() =>
                            editor.chain().focus().toggleBold().run()
                        }
                    >
                        Bold
                    </button>

                    <button
                        onClick={() =>
                            editor.chain().focus().toggleItalic().run()
                        }
                    >
                        Italic
                    </button>

                    <button
                        onClick={() =>
                            editor.chain().focus().toggleBulletList().run()
                        }
                    >
                        Bullet List
                    </button>

                    <button
                        onClick={() =>
                            editor
                                .chain()
                                .focus()
                                .toggleHeading({ level: 2 })
                                .run()
                        }
                    >
                        Heading
                    </button>

                </div>

                {/* TipTap Editor */}

                <EditorContent editor={editor} />

            </div>

            <br />

            {/* Note Type */}

            <select
                value={type}
                onChange={(e) => setType(e.target.value)}
            >
                <option value="private">
                    Private Note
                </option>

                <option value="shared">
                    Shared Note
                </option>
            </select>

            <br />
            <br />

            <button onClick={saveNote}>
                Save Note
            </button>

            <hr />

            {/* Saved Notes */}

            <h2>Saved Notes</h2>

            {notes.length === 0 ? (
                <p>No notes available.</p>
            ) : (
                notes.map((note) => (
                    <div
                        key={note._id}
                        style={{
                            border: "1px solid gray",
                            padding: "10px",
                            marginBottom: "10px"
                        }}
                    >

                        <p>
                            <strong>Type:</strong>{" "}
                            {note.type}
                        </p>

                        <p>
                            <strong>Date:</strong>{" "}
                            {new Date(
                                note.createdAt
                            ).toLocaleDateString()}
                        </p>

                        <div
                            dangerouslySetInnerHTML={{
                                __html: note.content
                            }}
                        />

                    </div>
                ))
            )}

        </div>
    );
}

export default Notes;