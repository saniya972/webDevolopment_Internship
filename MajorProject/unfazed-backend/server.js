require("dotenv").config();

const http = require("http");
const { Server } = require("socket.io");

const app = require("./app");
const connectDB = require("./src/config/db");
const Message = require("./src/models/Message");

const PORT = process.env.PORT || 5000;

connectDB();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

     socket.on("sendMessage", async (data) => {
    try {
        const { canAccess } = require("./src/services/entitlementService");

        const allowed = await canAccess(
            data.therapistId,
            "messages"
        );

        if (!allowed) {
            socket.emit("messageError", {
                message: "Messaging is not available on your current plan. Please upgrade."
            });

            return;
        }

        console.log("Message received:", data);

        const newMessage = await Message.create({
            therapistId: data.therapistId,
            clientId: data.clientId,
            sender: data.sender,
            message: data.message
        });

        socket.emit("receiveMessage", newMessage);

        socket.emit("newNotification", {
            message: "New message received"
        });

    } catch (error) {
        console.log("Message save failed:", error);

        socket.emit("messageError", {
            message: "Failed to send message"
        });
    }
});

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});