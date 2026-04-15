const express = require("express");
const router = express.Router();

// index (this fixes your browser issue)
router.get("/", (req,res) =>{
    res.send("get all posts");
});

// show
router.get("/:id", (req,res) =>{
    res.send("get post id");
});

// create
router.post("/", (req,res) =>{
    res.send("POSTS create for post");
});

// delete
router.delete("/:id", (req,res) =>{
    res.send("delete post id");
});

module.exports = router;
