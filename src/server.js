
require("dotenv").config();

const express = require("express");
const session = require("express-session");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { randomUUID } = require("crypto");

const signupRouter = require("./signup");
const loginRouter = require("./login");
const db = require("./config/db");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

// Session configuration
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

// Make login status available to all EJS pages
app.use((req, res, next) => {
    res.locals.isLoggedIn = Boolean(req.session.user);
    next();
});

// Authentication routes
app.use("/auth/register", signupRouter);
app.use("/auth/login", loginRouter);

// Handle student logout
app.post("/auth/logout", (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            console.error("Logout error:", error);
            return res.status(500).send("Unable to log out.");
        }

        res.clearCookie("connect.sid");
        return res.redirect("/");
    });
});

// Protect private pages
function requireAuth(req, res, next) {
    if (!req.session.user) {
        return res.redirect("/login");
    }

    next();
}

// Configure image upload directory
const uploadDirectory = path.join(
    __dirname,
    "../public/uploads/listings"
);

// Create directory automatically if it does not exist
fs.mkdirSync(uploadDirectory, { recursive: true });

// Configure Multer storage
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, uploadDirectory);
    },

    filename: (req, file, callback) => {
        const extensions = {
            "image/jpeg": ".jpg",
            "image/png": ".png",
            "image/webp": ".webp"
        };

        const extension = extensions[file.mimetype];

        callback(null, randomUUID() + extension);
    }
});

// Configure Multer upload validation
const upload = multer({
    storage: storage,

    limits: {
        fileSize: 5 * 1024 * 1024
    },

    fileFilter: (req, file, callback) => {
        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp"
        ];

        if (!allowedTypes.includes(file.mimetype)) {
            return callback(
                new Error("Only JPG, PNG, and WEBP images are allowed.")
            );
        }

        callback(null, true);
    }
});

// Public pages
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

// Private student dashboard

app.get("/dashboard", requireAuth, async (req, res) => {
    try {
        // Fetch the logged-in student's information
        const [students] = await db.execute(
            `SELECT user_id, full_name, email, student_id,
                    department, created_at
             FROM users
             WHERE user_id = ?`,
            [req.session.user.userId]
        );

        if (students.length === 0) {
            return req.session.destroy(() => {
                res.redirect("/login");
            });
        }

        // Fetch the student's five most recent listings
        const [listings] = await db.execute(
            `SELECT listing_id, title, category, listing_type,
                    price, image_path, status, created_at
             FROM listings
             WHERE user_id = ?
             ORDER BY created_at DESC
             LIMIT 5`,
            [req.session.user.userId]
        );

        // Render dashboard with student and listing information
        res.render("pages/dashboard", {
            student: students[0],
            listings: listings
        });

    } catch (error) {
        console.error("Dashboard error:", error);
        res.status(500).send("Unable to load your dashboard.");
    }
});


// Display Add Listing page (login required)
app.get("/add-listing", requireAuth, (req, res) => {
    res.render("pages/add-listing");
});

// Handle new listing submission
app.post(
    "/add-listing",
    requireAuth,
    upload.single("itemImage"),
    async (req, res) => {

        let imagePath = null;

        try {
            const {
                itemTitle,
                category,
                condition,
                description,
                listingType,
                price,
                weightKg,
                itemSize,
                isFragile
            } = req.body;

            // Validate required fields
            if (
                !itemTitle?.trim() ||
                !category ||
                !condition ||
                !description?.trim() ||
                !listingType
            ) {
                if (req.file) {
                    fs.unlinkSync(req.file.path);
                }

                return res.status(400).send(
                    "Please complete all required fields."
                );
            }

            // Validate category
            const allowedCategories = [
                "Books",
                "Electronics",
                "Study supplies",
                "Hostel & home",
                "Other"
            ];

            if (!allowedCategories.includes(category)) {
                return res.status(400).send("Invalid item category.");
            }

            // Validate condition
            const allowedConditions = [
                "Like new",
                "Good",
                "Usable"
            ];

            if (!allowedConditions.includes(condition)) {
                return res.status(400).send("Invalid item condition.");
            }

            // Validate listing type
            const allowedListingTypes = [
                "sell",
                "exchange",
                "donate"
            ];

            if (!allowedListingTypes.includes(listingType)) {
                return res.status(400).send("Invalid listing type.");
            }

            // Validate and convert price
            let itemPrice = null;

            if (price !== undefined && price.trim() !== "") {
                itemPrice = Number(price);

                if (!Number.isFinite(itemPrice) || itemPrice < 0) {
                    return res.status(400).send("Invalid item price.");
                }
            }

            // Price applies only to selling listings
            if (listingType !== "sell") {
                itemPrice = null;
            }

            // Validate and convert weight
            let itemWeight = null;

            if (weightKg !== undefined && weightKg.trim() !== "") {
                itemWeight = Number(weightKg);

                if (!Number.isFinite(itemWeight) || itemWeight < 0) {
                    return res.status(400).send("Invalid item weight.");
                }
            }

            // Validate item size
            const allowedSizes = [
                "Small",
                "Medium",
                "Large",
                "Extra large"
            ];

            if (itemSize && !allowedSizes.includes(itemSize)) {
                return res.status(400).send("Invalid item size.");
            }

            // Convert fragile value to boolean
            const fragile = isFragile === "yes";

            // Save uploaded image path
            if (req.file) {
                imagePath = "/uploads/listings/" + req.file.filename;
            }

            // Insert listing into database
            await db.execute(
                `INSERT INTO listings
                (
                    user_id,
                    title,
                    category,
                    \`condition\`,
                    description,
                    listing_type,
                    price,
                    weight_kg,
                    item_size,
                    is_fragile,
                    image_path
                )
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    req.session.user.userId,
                    itemTitle.trim(),
                    category,
                    condition,
                    description.trim(),
                    listingType,
                    itemPrice,
                    itemWeight,
                    itemSize || null,
                    fragile,
                    imagePath
                ]
            );

            // Redirect after successful publication
            return res.redirect("/marketplace?listing=created");

        } catch (error) {
            console.error("Create listing error:", error);

            // Remove uploaded image if database insertion fails
            if (req.file && fs.existsSync(req.file.path)) {
                fs.unlinkSync(req.file.path);
            }

            return res.status(500).send(
                "Something went wrong while publishing your listing."
            );
        }
    }
);

// Handle Multer upload errors
app.use((error, req, res, next) => {
    console.error("Upload error:", error.message);

    if (error instanceof multer.MulterError) {
        if (error.code === "LIMIT_FILE_SIZE") {
            return res.status(400).send(
                "Image size must not exceed 5 MB."
            );
        }
    }

    if (error.message.includes("Only JPG, PNG, and WEBP")) {
        return res.status(400).send(error.message);
    }

    return res.status(500).send("An error occurred while uploading the image.");
});

// Start server
app.listen(PORT, () => {
    console.log(`CampusLoop server running at http://localhost:${PORT}`);
});
