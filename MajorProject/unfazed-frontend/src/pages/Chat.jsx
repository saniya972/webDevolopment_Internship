import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import api from "../api/axios";
import { jwtDecode } from "jwt-decode";

const socket = io("http://localhost:5000");

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
            console.log("RECEIVED:", data);

            // Only show message for selected client
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
        <div>
            <h1>Messages</h1>

            <select
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
            >
                <option value="">
                    Select Client
                </option>

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

            <div
                style={{
                    border: "1px solid gray",
                    height: "300px",
                    padding: "10px",
                    marginBottom: "10px",
                    overflowY: "auto"
                }}
            >
                {messages.length === 0 ? (
                    <p>No messages yet.</p>
                ) : (
                    messages.map((item) => (
                        <p key={item._id}>
                            <strong>{item.sender}:</strong>{" "}
                            {item.message}
                        </p>
                    ))
                )}
            </div>

            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
            />

            <button onClick={sendMessage}>
                Send
            </button>
        </div>
    );
}

export default Chat;