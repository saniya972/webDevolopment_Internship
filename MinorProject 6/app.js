const express = require("express");

const postRoutes = require("./routes/postRoutes");
const errorHandler = require("./middleware/errorMiddleware");

const app = express();


// Middleware
app.use(express.json());


// Home route
app.get("/", (req, res) => {
    res.json({
        message: "Blog REST API is running"
    });
});


// Blog routes
app.use("/posts", postRoutes);


// Error handling middleware
app.use(errorHandler);


module.exports = app;