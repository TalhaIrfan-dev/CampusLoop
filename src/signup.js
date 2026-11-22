
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("./config/db");

// Handle student registration
router.post("/", async (req, res) => {
    try {
        const {
            fullName,
            email,
            studentId,
            department,
            password,
            terms
        } = req.body;

        // Validate required fields
        if (
            !fullName?.trim() ||
            !email?.trim() ||
            !studentId?.trim() ||
            !department?.trim() ||
            !password
        ) {
            return res.status(400).send("All fields are required.");
        }

        if (!terms) {
            return res.status(400).send(
                "You must accept the terms and conditions."
            );
        }

        // Normalize input
        const normalizedEmail = email.trim().toLowerCase();
        const normalizedStudentId = studentId.trim();

        // Validate email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(normalizedEmail)) {
            return res.status(400).send("Invalid email address.");
        }

        if (password.length < 8) {
            return res.status(400).send(
                "Password must be at least 8 characters long."
            );
        }

        // Check whether email or student ID already exists
        const [existingUsers] = await db.execute(
            "SELECT email, student_id FROM users WHERE email = ? OR student_id = ?",
            [normalizedEmail, normalizedStudentId]
        );

        if (existingUsers.length > 0) {
            const emailExists = existingUsers.some(
                user => user.email === normalizedEmail
            );

            if (emailExists) {
                return res.status(409).send(
                    "This email is already registered."
                );
            }

            return res.status(409).send(
                "This student ID is already registered."
            );
        }

        // Hash password
        const passwordHash = await bcrypt.hash(password, 12);

        // Insert new student
        await db.execute(
            `INSERT INTO users
            (full_name, email, student_id, department,
             password_hash, terms_accepted_at)
            VALUES (?, ?, ?, ?, ?, NOW())`,
            [
                fullName.trim(),
                normalizedEmail,
                normalizedStudentId,
                department.trim(),
                passwordHash
            ]
        );

        return res.redirect("/login?registered=success");

    } catch (error) {
        console.error("Signup error:", error);

        if (error.code === "ER_DUP_ENTRY") {
            return res.status(409).send(
                "Email or student ID is already registered."
            );
        }

        return res.status(500).send(
            "Something went wrong during registration."
        );
    }
});

module.exports = router;
