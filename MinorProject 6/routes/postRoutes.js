const express = require("express");

const router = express.Router();

const {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost
} = require("../controllers/postController");


// POST /posts
router.post("/", createPost);

// GET /posts
router.get("/", getAllPosts);

// GET /posts/:id
router.get("/:id", getPostById);

// PUT /posts/:id
router.put("/:id", updatePost);

// DELETE /posts/:id
router.delete("/:id", deletePost);


module.exports = router;