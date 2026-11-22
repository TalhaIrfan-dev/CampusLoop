
// Load environment variables
require("dotenv").config();

const express = require("express");
const signupRouter = require("./signup");

const app = express();
const PORT = process.env.PORT || 3000;

// ==============================
// Middleware Configuration
// ==============================

// Parse HTML form data
app.use(express.urlencoded({ extended: true }));

// Serve static files from public folder
app.use(express.static("public"));

// Configure EJS
app.set("view engine", "ejs");

// ==============================
// Authentication Routes
// ==============================

app.use("/auth/register", signupRouter);

// ==============================
// Page Routes
// ==============================

// Home page
app.get("/", (req, res) => {
    res.render("pages/home");
});

// Login page
app.get("/login", (req, res) => {
    res.render("pages/login");
});

// Signup page
app.get("/signup", (req, res) => {
    res.render("pages/signup");
});

// Marketplace page
app.get("/marketplace", (req, res) => {
    res.render("pages/marketplace");
});

// Product Details page
app.get("/product-detail", (req, res) => {
    res.render("pages/product-detail");
});

// Add Listing page
app.get("/add-listing", (req, res) => {
    res.render("pages/add-listing");
});

// Dashboard page
app.get("/dashboard", (req, res) => {
    res.render("pages/dashboard");
});

// ==============================
// Start Server
// ==============================

app.listen(PORT, () => {
    console.log(`CampusLoop server running at http://localhost:${PORT}`);
});
