const express = require("express");
const router = express.Router();

// index
router.get("/user", (req,res) =>{
    res.send("Get for users");
});

// show user
router.get("/:id", (req,res) =>{
    res.send("get for users id");
});


// create
router.post("/", (req,res) =>{
    res.send("post for users");
});

// delete
router.delete("/:id", (req,res) =>{
    res.send("delete for user id");
});

module.exports = router;
