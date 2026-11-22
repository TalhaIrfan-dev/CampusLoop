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
const uploadDirectory = path.join(__dirname, "../public/uploads/listings");

fs.mkdirSync(uploadDirectory, { recursive: true });

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false, // Set true when deployed behind HTTPS.
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000
    }
}));

app.use((req, res, next) => {
    res.locals.isLoggedIn = Boolean(req.session.user);
    res.locals.currentUser = req.session.user || null;
    next();
});

app.use("/auth/register", signupRouter);
app.use("/auth/login", loginRouter);

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

function requireAuth(req, res, next) {
    if (!req.session.user) return res.redirect("/login");
    next();
}

const allowedCategories = [
    "Books", "Electronics", "Study supplies", "Hostel & home", "Other"
];
const allowedConditions = ["Like new", "Good", "Usable"];
const allowedListingTypes = ["sell", "exchange", "donate"];
const allowedSizes = ["Small", "Medium", "Large", "Extra large"];

const storage = multer.diskStorage({
    destination: (req, file, callback) => callback(null, uploadDirectory),
    filename: (req, file, callback) => {
        const extensions = {
            "image/jpeg": ".jpg",
            "image/png": ".png",
            "image/webp": ".webp"
        };
        callback(null, randomUUID() + extensions[file.mimetype]);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, callback) => {
        const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
        if (!allowedTypes.includes(file.mimetype)) {
            return callback(new Error("Only JPG, PNG, and WEBP images are allowed."));
        }
        callback(null, true);
    }
});

function removeUploadedFile(file) {
    if (file && file.path && fs.existsSync(file.path)) {
        fs.unlink(file.path, (error) => {
            if (error) console.error("Unable to remove uploaded file:", error);
        });
    }
}

function removeListingImage(imagePath) {
    if (!imagePath || !imagePath.startsWith("/uploads/listings/")) return;
    const filename = path.basename(imagePath);
    const absolutePath = path.join(uploadDirectory, filename);
    if (fs.existsSync(absolutePath)) {
        fs.unlink(absolutePath, (error) => {
            if (error) console.error("Unable to remove listing image:", error);
        });
    }
}

function validateListingInput(body) {
    const title = (body.itemTitle || "").trim();
    const category = body.category;
    const condition = body.condition;
    const description = (body.description || "").trim();
    const listingType = body.listingType;

    if (!title || !category || !condition || !description || !listingType) {
        return { error: "Please complete all required fields." };
    }
    if (title.length > 150) return { error: "Item title must be 150 characters or fewer." };
    if (description.length > 2000) return { error: "Description must be 2000 characters or fewer." };
    if (!allowedCategories.includes(category)) return { error: "Invalid item category." };
    if (!allowedConditions.includes(condition)) return { error: "Invalid item condition." };
    if (!allowedListingTypes.includes(listingType)) return { error: "Invalid listing type." };

    let itemPrice = null;
    if (body.price !== undefined && String(body.price).trim() !== "") {
        itemPrice = Number(body.price);
        if (!Number.isFinite(itemPrice) || itemPrice < 0 || itemPrice > 99999999.99) {
            return { error: "Please enter a valid item price." };
        }
    }
    if (listingType !== "sell") itemPrice = null;

    let itemWeight = null;
    if (body.weightKg !== undefined && String(body.weightKg).trim() !== "") {
        itemWeight = Number(body.weightKg);
        if (!Number.isFinite(itemWeight) || itemWeight < 0) {
            return { error: "Please enter a valid item weight." };
        }
    }

    const itemSize = body.itemSize || null;
    if (itemSize && !allowedSizes.includes(itemSize)) {
        return { error: "Invalid item size." };
    }

    return {
        values: {
            title, category, condition, description, listingType,
            itemPrice, itemWeight, itemSize,
            fragile: body.isFragile === "yes"
        }
    };
}

// Public pages
app.get("/", (req, res) => res.render("pages/home"));
app.get("/login", (req, res) => res.render("pages/login"));
app.get("/signup", (req, res) => res.render("pages/signup"));

// Marketplace: search, filters and sorting are all handled with parameterized SQL.
app.get("/marketplace", async (req, res) => {
    try {
        const search = String(req.query.search || "").trim().slice(0, 100);
        const category = allowedCategories.includes(req.query.category) ? req.query.category : "";
        const listingType = allowedListingTypes.includes(req.query.listingType) ? req.query.listingType : "";
        const condition = allowedConditions.includes(req.query.condition) ? req.query.condition : "";

        const sortOptions = {
            newest: "l.created_at DESC",
            price_asc: "l.price IS NULL ASC, l.price ASC, l.created_at DESC",
            price_desc: "l.price IS NULL ASC, l.price DESC, l.created_at DESC"
        };
        const sort = Object.prototype.hasOwnProperty.call(sortOptions, req.query.sort)
            ? req.query.sort
            : "newest";

        const conditions = ["l.status = 'active'"];
        const parameters = [];

        if (search) {
            conditions.push("(l.title LIKE ? OR l.description LIKE ? OR l.category LIKE ?)");
            const searchTerm = `%${search}%`;
            parameters.push(searchTerm, searchTerm, searchTerm);
        }
        if (category) {
            conditions.push("l.category = ?");
            parameters.push(category);
        }
        if (listingType) {
            conditions.push("l.listing_type = ?");
            parameters.push(listingType);
        }
        if (condition) {
            conditions.push("l.`condition` = ?");
            parameters.push(condition);
        }

        const sql = `
            SELECT
                l.listing_id, l.title, l.category, l.\`condition\`,
                l.description, l.listing_type, l.price, l.weight_kg,
                l.item_size, l.is_fragile, l.image_path, l.status, l.created_at,
                u.full_name AS seller_name, u.department AS seller_department
            FROM listings l
            INNER JOIN users u ON u.user_id = l.user_id
            WHERE ${conditions.join(" AND ")}
            ORDER BY ${sortOptions[sort]}
        `;

        const [listings] = await db.execute(sql, parameters);

        res.render("pages/marketplace", {
            listings,
            filters: { search, category, listingType, condition, sort },
            resultCount: listings.length,
            listingCreated: req.query.listing === "created"
        });
    } catch (error) {
        console.error("Marketplace error:", error);
        res.status(500).send("Unable to load marketplace listings.");
    }
});

// Product detail page: the URL identifies one real listing.
app.get("/product-detail/:id", async (req, res) => {
    const listingId = Number(req.params.id);
    if (!Number.isSafeInteger(listingId) || listingId <= 0) {
        return res.status(404).send("Listing not found.");
    }

    try {
        const [rows] = await db.execute(
            `SELECT
                l.listing_id, l.user_id, l.title, l.category, l.\`condition\`,
                l.description, l.listing_type, l.price, l.weight_kg,
                l.item_size, l.is_fragile, l.image_path, l.status, l.created_at,
                u.full_name AS seller_name, u.email AS seller_email,
                u.department AS seller_department, u.student_id
             FROM listings l
             INNER JOIN users u ON u.user_id = l.user_id
             WHERE l.listing_id = ?`,
            [listingId]
        );

        if (rows.length === 0) return res.status(404).send("Listing not found.");

        const listing = rows[0];
        if (listing.status !== "active" && (!req.session.user ||
            req.session.user.userId !== listing.user_id)) {
            return res.status(404).send("This listing is no longer available.");
        }

        res.render("pages/product-detail", { listing });
    } catch (error) {
        console.error("Product detail error:", error);
        res.status(500).send("Unable to load product details.");
    }
});

// Private student dashboard
app.get("/dashboard", requireAuth, async (req, res) => {
    try {
        const [students] = await db.execute(
            `SELECT user_id, full_name, email, student_id, department, created_at
             FROM users WHERE user_id = ?`,
            [req.session.user.userId]
        );

        if (students.length === 0) {
            return req.session.destroy(() => res.redirect("/login"));
        }

        const [listings] = await db.execute(
            `SELECT listing_id, title, category, listing_type, price,
                    image_path, status, created_at
             FROM listings
             WHERE user_id = ?
             ORDER BY created_at DESC
             LIMIT 5`,
            [req.session.user.userId]
        );

        res.render("pages/dashboard", { student: students[0], listings });
    } catch (error) {
        console.error("Dashboard error:", error);
        res.status(500).send("Unable to load your dashboard.");
    }
});

// Add listing
app.get("/add-listing", requireAuth, (req, res) => res.render("pages/add-listing"));

app.post("/add-listing", requireAuth, upload.single("itemImage"), async (req, res) => {
    const validation = validateListingInput(req.body);
    if (validation.error) {
        removeUploadedFile(req.file);
        return res.status(400).send(validation.error);
    }

    const v = validation.values;
    const imagePath = req.file ? `/uploads/listings/${req.file.filename}` : null;

    try {
        await db.execute(
            `INSERT INTO listings
                (user_id, title, category, \`condition\`, description, listing_type,
                 price, weight_kg, item_size, is_fragile, image_path)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                req.session.user.userId, v.title, v.category, v.condition,
                v.description, v.listingType, v.itemPrice, v.itemWeight,
                v.itemSize, v.fragile, imagePath
            ]
        );
        return res.redirect("/marketplace?listing=created");
    } catch (error) {
        console.error("Create listing error:", error);
        removeUploadedFile(req.file);
        return res.status(500).send("Something went wrong while publishing your listing.");
    }
});

// View only the logged-in student's own listings.
app.get("/my-listings", requireAuth, async (req, res) => {
    try {
        const [listings] = await db.execute(
            `SELECT listing_id, title, category, \`condition\`, listing_type,
                    price, image_path, status, created_at
             FROM listings
             WHERE user_id = ?
             ORDER BY created_at DESC`,
            [req.session.user.userId]
        );
        res.render("pages/my-listings", { listings });
    } catch (error) {
        console.error("My listings error:", error);
        res.status(500).send("Unable to load your listings.");
    }
});

// Edit form. Ownership is checked before showing the form.
app.get("/my-listings/:id/edit", requireAuth, async (req, res) => {
    const listingId = Number(req.params.id);
    if (!Number.isSafeInteger(listingId) || listingId <= 0) {
        return res.status(404).send("Listing not found.");
    }

    try {
        const [rows] = await db.execute(
            "SELECT * FROM listings WHERE listing_id = ? AND user_id = ?",
            [listingId, req.session.user.userId]
        );
        if (rows.length === 0) return res.status(404).send("Listing not found.");
        res.render("pages/edit-listing", { listing: rows[0] });
    } catch (error) {
        console.error("Edit listing page error:", error);
        res.status(500).send("Unable to open listing for editing.");
    }
});

// Update only a listing owned by the current student.
app.post("/my-listings/:id/edit", requireAuth, upload.single("itemImage"), async (req, res) => {
    const listingId = Number(req.params.id);
    if (!Number.isSafeInteger(listingId) || listingId <= 0) {
        removeUploadedFile(req.file);
        return res.status(404).send("Listing not found.");
    }

    const validation = validateListingInput(req.body);
    if (validation.error) {
        removeUploadedFile(req.file);
        return res.status(400).send(validation.error);
    }

    try {
        const [existingRows] = await db.execute(
            "SELECT image_path FROM listings WHERE listing_id = ? AND user_id = ?",
            [listingId, req.session.user.userId]
        );
        if (existingRows.length === 0) {
            removeUploadedFile(req.file);
            return res.status(404).send("Listing not found.");
        }

        const v = validation.values;
        const imagePath = req.file
            ? `/uploads/listings/${req.file.filename}`
            : existingRows[0].image_path;

        await db.execute(
            `UPDATE listings
             SET title = ?, category = ?, \`condition\` = ?, description = ?,
                 listing_type = ?, price = ?, weight_kg = ?, item_size = ?,
                 is_fragile = ?, image_path = ?
             WHERE listing_id = ? AND user_id = ?`,
            [
                v.title, v.category, v.condition, v.description, v.listingType,
                v.itemPrice, v.itemWeight, v.itemSize, v.fragile, imagePath,
                listingId, req.session.user.userId
            ]
        );

        if (req.file) removeListingImage(existingRows[0].image_path);
        return res.redirect("/my-listings?updated=1");
    } catch (error) {
        console.error("Update listing error:", error);
        removeUploadedFile(req.file);
        return res.status(500).send("Unable to update this listing.");
    }
});

// Delete only a listing owned by the current student.
app.post("/my-listings/:id/delete", requireAuth, async (req, res) => {
    const listingId = Number(req.params.id);
    if (!Number.isSafeInteger(listingId) || listingId <= 0) {
        return res.status(404).send("Listing not found.");
    }

    try {
        const [result] = await db.execute(
            "SELECT image_path FROM listings WHERE listing_id = ? AND user_id = ?",
            [listingId, req.session.user.userId]
        );
        if (result.length === 0) return res.status(404).send("Listing not found.");

        await db.execute(
            "DELETE FROM listings WHERE listing_id = ? AND user_id = ?",
            [listingId, req.session.user.userId]
        );
        removeListingImage(result[0].image_path);
        return res.redirect("/my-listings?deleted=1");
    } catch (error) {
        console.error("Delete listing error:", error);
        res.status(500).send("Unable to delete this listing.");
    }
});

// Handle Multer and upload errors.
app.use((error, req, res, next) => {
    console.error("Upload error:", error.message);

    if (error instanceof multer.MulterError && error.code === "LIMIT_FILE_SIZE") {
        return res.status(400).send("Image size must not exceed 5 MB.");
    }
    if (error.message && error.message.includes("Only JPG, PNG, and WEBP")) {
        return res.status(400).send(error.message);
    }
    return res.status(500).send("An error occurred while uploading the image.");
});

app.listen(PORT, () => {
    console.log(`CampusLoop server running at http://localhost:${PORT}`);
});
