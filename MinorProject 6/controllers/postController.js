const posts = require("../data/posts");

// CREATE
const createPost = (req, res) => {
    const { title, content, author, category } = req.body;

    if (!title || !content || !author || !category) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    const newPost = {
        id: posts.length > 0 ? posts[posts.length - 1].id + 1 : 1,
        title,
        content,
        author,
        category,
        createdDate: new Date().toISOString()
    };

    posts.push(newPost);

    res.status(201).json({
        message: "Post created successfully",
        post: newPost
    });
};


// GET ALL
const getAllPosts = (req, res) => {
    res.status(200).json(posts);
};


// GET SINGLE
const getPostById = (req, res) => {
    const id = parseInt(req.params.id);

    const post = posts.find(post => post.id === id);

    if (!post) {
        return res.status(404).json({
            message: "Post not found"
        });
    }

    res.status(200).json(post);
};


// UPDATE
const updatePost = (req, res) => {
    const id = parseInt(req.params.id);

    const post = posts.find(post => post.id === id);

    if (!post) {
        return res.status(404).json({
            message: "Post not found"
        });
    }

    const { title, content, author, category } = req.body;

    if (title) post.title = title;
    if (content) post.content = content;
    if (author) post.author = author;
    if (category) post.category = category;

    res.status(200).json({
        message: "Post updated successfully",
        post: post
    });
};


// DELETE
const deletePost = (req, res) => {
    const id = parseInt(req.params.id);

    const index = posts.findIndex(post => post.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Post not found"
        });
    }

    posts.splice(index, 1);

    res.status(200).json({
        message: "Post deleted successfully"
    });
};


module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost
};