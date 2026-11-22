
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("./config/db");

// Handle student login
router.post("/", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate required fields
        if (!email?.trim() || !password) {
            return res.status(400).send("Email and password are required.");
        }

        // Normalize email
        const normalizedEmail = email.trim().toLowerCase();

        // Find student in database
        const [users] = await db.execute(
            `SELECT user_id, full_name, email, password_hash
             FROM users
             WHERE email = ?`,
            [normalizedEmail]
        );

        // Check whether account exists
        if (users.length === 0) {
            return res.status(401).send("Invalid email or password.");
        }

        const user = users[0];

        // Compare entered password with stored password hash
        const passwordMatches = await bcrypt.compare(
            password,
            user.password_hash
        );

        if (!passwordMatches) {
            return res.status(401).send("Invalid email or password.");
        }

        // Regenerate session to prevent session fixation
        req.session.regenerate((error) => {
            if (error) {
                console.error("Session error:", error);
                return res.status(500).send("Unable to create login session.");
            }

            // Store authenticated student information in session
            req.session.user = {
                userId: user.user_id,
                fullName: user.full_name,
                email: user.email
            };

            // Save session before redirecting
            req.session.save((error) => {
                if (error) {
                    console.error("Session save error:", error);
                    return res.status(500).send("Unable to save login session.");
                }

                return res.redirect("/dashboard");
            });
        });

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).send("Something went wrong during login.");
    }
});

module.exports = router;
