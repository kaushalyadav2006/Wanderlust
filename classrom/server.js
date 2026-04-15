const express = require("express");
const app = express();

const users = require("./routes/user.js");
const posts = require("./routes/post.js");
const cookieParser = require("cookie-parser");

// app.use(cookieParser());


//signed cookies
app.use(cookieParser("secretcode"))
app.get("/getsignedCookies", (req,res) =>{
    res.cookie("madeIn", "India", {signed: true});
    res.send("signed cookies send");
});

app.get("/verify", (req, res) => {
    console.log(req.cookies);         // normal cookies
    console.log(req.signedCookies);   // ✅ signed cookies
    res.send("verified");
});
//sending cookies
app.get("/getcookies", (req, res) => {
    res.cookie("greet", "aman");
    res.cookie("made_in_india", "china"); // fixed name
    res.send("sent you some cookies");
});

//using cookie parser
app.get("/greet", (req,res)=>{
    let{name = "anonymous"} = req.cookies;
    res.send(`Hii, ${name}`);
})

app.get("/", (req,res) => {
    console.dir(req.cookies);
    res.send("Hii, I'm root");
});



app.use("/user", users);
app.use("/post", posts);



app.listen(3333,() =>{
    console.log("server is working fine");
});