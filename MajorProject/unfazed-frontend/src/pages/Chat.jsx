
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import api from "../api/axios";
import { jwtDecode } from "jwt-decode";

const socket = io("https://unfazed-backend-dzvn.onrender.com");

function Chat() {
    const [clients, setClients] = useState([]);
    const [clientId, setClientId] = useState("");
    const [therapistId, setTherapistId] = useState("");
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const handleNotification = (data) => {
            alert(data.message);
        };

        socket.on("newNotification", handleNotification);

        return () => {
            socket.off("newNotification", handleNotification);
        };
    }, []);

    // Get therapist ID
    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            const decoded = jwtDecode(token);
            setTherapistId(decoded.id);
        }
    }, []);

    // Get clients
    useEffect(() => {
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

        getClients();
    }, []);

    // Receive message
    useEffect(() => {
        const handleReceiveMessage = (data) => {
            if (data.clientId !== clientId) {
                return;
            }

            setMessages((prev) => {
                const exists = prev.some(
                    (item) => item._id === data._id
                );

                if (exists) {
                    return prev;
                }

                return [...prev, data];
            });
        };

        socket.on("receiveMessage", handleReceiveMessage);

        return () => {
            socket.off("receiveMessage", handleReceiveMessage);
        };
    }, [clientId]);

    // Load chat history
    useEffect(() => {
        if (!clientId) {
            setMessages([]);
            return;
        }

        const getMessages = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await api.get(
                    `/messages/${clientId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                setMessages(response.data.messages);
            } catch (error) {
                console.log(error);
            }
        };

        getMessages();
    }, [clientId]);

    // Send message
    const sendMessage = () => {
        if (!clientId) {
            alert("Please select a client");
            return;
        }

        if (message.trim() === "") {
            return;
        }

        socket.emit("sendMessage", {
            therapistId: therapistId,
            clientId: clientId,
            sender: "therapist",
            message: message
        });

        setMessage("");
    };

    return (
        <div className="chat-page">

            {/* Header */}
            <div className="chat-header">
                <div>
                    <span className="chat-tag">COMMUNICATION</span>
                    <h1>Messages</h1>
                    <p>
                        Connect with your clients and manage
                        conversations in one place.
                    </p>
                </div>

                <div className="chat-header-icon">💬</div>
            </div>

            {/* Chat Container */}
            <div className="chat-container">

                {/* Sidebar */}
                <div className="chat-sidebar">
                    <div className="chat-sidebar-heading">
                        <div>
                            <h3>Your Clients</h3>
                            <p>Select a client to start chatting</p>
                        </div>

                        <span className="chat-client-count">
                            {clients.length}
                        </span>
                    </div>

                    <select
                        className="chat-client-select"
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

                    <div className="chat-client-list">
                        {clients.map((client) => (
                            <button
                                key={client._id}
                                className={`chat-client-item ${
                                    clientId === client._id
                                        ? "active"
                                        : ""
                                }`}
                                onClick={() =>
                                    setClientId(client._id)
                                }
                            >
                                <div className="chat-avatar">
                                    {client.name
                                        ?.charAt(0)
                                        .toUpperCase()}
                                </div>

                                <div className="chat-client-info">
                                    <strong>{client.name}</strong>
                                    <span>Click to chat</span>
                                </div>

                                <span className="chat-client-arrow">
                                    ›
                                </span>
                            </button>
                        ))}

                        {clients.length === 0 && (
                            <div className="chat-no-clients">
                                <span>👥</span>
                                <p>No clients available yet.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Chat Area */}
                <div className="chat-main">

                    <div className="chat-conversation-header">
                        <div className="chat-avatar chat-main-avatar">
                            {clientId
                                ? clients
                                      .find(
                                          (client) =>
                                              client._id === clientId
                                      )
                                      ?.name?.charAt(0)
                                      .toUpperCase()
                                : "💬"}
                        </div>

                        <div>
                            <h3>
                                {clientId
                                    ? clients.find(
                                          (client) =>
                                              client._id === clientId
                                      )?.name
                                    : "Your Conversation"}
                            </h3>

                            <p>
                                {clientId
                                    ? "Client conversation"
                                    : "Select a client to begin"}
                            </p>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="chat-messages-area">
                        {!clientId ? (
                            <div className="chat-welcome">
                                <div className="chat-welcome-icon">
                                    💬
                                </div>

                                <h3>Start a Conversation</h3>

                                <p>
                                    Select a client from the left
                                    panel to view messages and
                                    start chatting.
                                </p>
                            </div>
                        ) : messages.length === 0 ? (
                            <div className="chat-welcome">
                                <div className="chat-welcome-icon">
                                    ✉️
                                </div>

                                <h3>No messages yet</h3>

                                <p>
                                    Send your first message to
                                    start the conversation.
                                </p>
                            </div>
                        ) : (
                            messages.map((item) => (
                                <div
                                    key={item._id}
                                    className={`chat-message-row ${
                                        item.sender === "therapist"
                                            ? "sent"
                                            : "received"
                                    }`}
                                >
                                    <div className="chat-message-bubble">
                                        <span className="chat-sender">
                                            {item.sender === "therapist"
                                                ? "You"
                                                : item.sender}
                                        </span>

                                        <p>{item.message}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Message Input */}
                    <div className="chat-input-area">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) =>
                                setMessage(e.target.value)
                            }
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    sendMessage();
                                }
                            }}
                            placeholder={
                                clientId
                                    ? "Type your message..."
                                    : "Select a client first"
                            }
                            disabled={!clientId}
                        />

                        <button
                            className="chat-send-button"
                            onClick={sendMessage}
                            disabled={
                                !clientId || !message.trim()
                            }
                        >
                            Send <span>➤</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Chat;