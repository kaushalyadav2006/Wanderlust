const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate"); //for styling multiple ejs template
const ExpressError = require("./utils/ExpressError.js");

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const { emitWarning } = require("process");

const Mongo_URL = "mongodb://127.0.0.1:27017/wanderlust";
main()
  .then(() => {
    console.log("Connected to db");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(Mongo_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

const sessionOption = {
  secret: "mysupersecretstring",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 10000, //cookies in session
    maxAge: 7 * 24 * 60 * 60 * 10000,
    httpOnly: true,
  },
};
app.get("/", (req, res) => {
  res.send("hii , I'm root");
});

app.use(session(sessionOption));
app.use(flash()); //use it before routes

app.use(passport.initialize()); // a middleware that initialize passport
app.use(passport.session()); //a web application need the ability to identify users as they browse from page to page
passport.use(new LocalStrategy(User.authenticate())); //static method to authenticate model---Generate a function that use in passports's localStrategy

passport.serializeUser(User.serializeUser()); //searialize users into the session
passport.deserializeUser(User.deserializeUser()); //desearialize session--if, user ended his session

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  // console.log(res.locals.success);
  next(); // important to call next
});

// app.get("/demouser", async (req, res) => {
//   let fakeUser = new User({
//     email: "student@gmail.com",
//     username: "delta-student",
//   });

//   let registeredUser = await User.register(fakeUser, "Helloworld");
//   res.send(registeredUser);
// });

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

// 404 handler
app.use((req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

// error handler (ONLY ONE)
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render("listings/error.ejs", { message });
});

app.listen(8080, () => {
  console.log("server is litening to port 8080");
});
