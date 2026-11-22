
// Load environment variables
require("dotenv").config();

const express = require("express");
const session = require("express-session");
const signupRouter = require("./signup");
const loginRouter = require("./login");

const app = express();
const PORT = process.env.PORT || 3000;

// ==============================
// Middleware Configuration
// ==============================

// Parse HTML form data
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static("public"));

// Configure EJS
app.set("view engine", "ejs");

// Configure user sessions
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000
    }
}));

// ==============================
// Authentication Routes
// ==============================

app.use("/auth/register", signupRouter);

app.use("/auth/login", loginRouter);

// ==============================
// Page Routes
// ==============================

app.get("/", (req, res) => {
    res.render("pages/home");
});

app.get("/login", (req, res) => {
    res.render("pages/login");
});

app.get("/signup", (req, res) => {
    res.render("pages/signup");
});

app.get("/marketplace", (req, res) => {
    res.render("pages/marketplace");
});

app.get("/product-detail", (req, res) => {
    res.render("pages/product-detail");
});

app.get("/add-listing", (req, res) => {
    res.render("pages/add-listing");
});

app.get("/dashboard", (req, res) => {
    res.render("pages/dashboard");
});

// ==============================
// Start Server
// ==============================

app.listen(PORT, () => {
    console.log(`CampusLoop server running at http://localhost:${PORT}`);
});
