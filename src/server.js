const express = require("express");

const app = express();
const PORT = 3000;

// Configure EJS
app.set("view engine", "ejs");

// Serve static files from the public folder
app.use(express.static("public"));

// Home route
app.get("/", (req, res) => {
    res.render("pages/home");
});

// Start server
app.listen(PORT, () => {
    console.log(`CampusLoop server running at http://localhost:${PORT}`);
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