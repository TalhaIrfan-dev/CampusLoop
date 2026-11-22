
require("dotenv").config();

const pool = require("./db");

async function testConnection() {
    try {
        const connection = await pool.getConnection();

        console.log("Database connection successful!");
        console.log(`Connected to database: ${process.env.DB_NAME}`);

        connection.release();
    } catch (error) {
        console.error("Database connection failed!");
        console.error(error.message);

        process.exitCode = 1;
    } finally {
        await pool.end();
    }
}

testConnection();
