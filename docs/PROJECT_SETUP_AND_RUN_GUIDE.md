# CampusLoop – Project Setup and Running Guide

This document explains how to set up and run CampusLoop on a local computer.

## 1. Project Overview

CampusLoop is a university-focused peer-to-peer marketplace where students can buy, sell, exchange, donate, and discover items within their campus community.

## 2. Technologies Used

- **Frontend:** HTML, CSS, JavaScript
- **Templating:** EJS
- **Backend:** Node.js and Express.js
- **Database:** MySQL
- **Database tool:** MySQL Workbench
- **Authentication:** bcrypt and express-session
- **Image uploads:** Multer

## 3. Prerequisites

Install the following software before setting up the project:

1. **Node.js and npm** – Download from [https://nodejs.org/](https://nodejs.org/).
2. **MySQL Server** – Required to run the database.
3. **MySQL Workbench** – Used to manage the database.

After installing Node.js, verify the installations in a terminal:

```bash
node --version
npm --version
```

## 4. Get the Project

Clone the repository:

```bash
git clone https://github.com/TalhaIrfan-dev/CampusLoop.git
```

Move into the project directory:

```bash
cd CampusLoop
```

If the project has already been downloaded as a ZIP file, extract it and open the extracted `CampusLoop` folder in VS Code or another code editor.

## 5. Install Project Dependencies

Run this command from the project root directory:

```bash
npm install
```

This installs the packages listed in `package.json`. The `node_modules` folder is generated automatically; it does not need to be downloaded or copied separately.

## 6. Configure the Database

1. Start the MySQL Server.
2. Open MySQL Workbench and connect to your local MySQL instance.
3. Open the SQL file:

   `database/database_schema.sql`

4. Execute the complete SQL script.

The script creates the `campusloop_db` database and the tables currently defined in the project schema, including `users` and `listings`.

> If your MySQL server uses a port other than `3306` (for example, `3307`), use that port in the environment configuration in the next step.

## 7. Configure Environment Variables

In the project root directory, create a file named `.env`.

Use `.env.example` as a reference and add your local configuration:

```env
PORT=3000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=campusloop_db
DB_PORT=3306

SESSION_SECRET=replace_with_a_random_secret
```

Update the values according to your MySQL setup:

- `DB_USER`: Your MySQL username.
- `DB_PASSWORD`: The password for that MySQL user. If the account has no password, leave the value empty.
- `DB_PORT`: Your MySQL Server port.
- `SESSION_SECRET`: Replace the example value with a long, random secret.

**Important:** Do not share or commit your `.env` file. It contains local credentials and is excluded through `.gitignore`. Keep `.env.example` in the repository as a configuration reference.

## 8. Run the Application

Make sure MySQL Server is running, then open a terminal in the project root directory.

For development mode, run:

```bash
npm run dev
```

This starts the application using Nodemon, which restarts the server when source files change.

Alternatively, run the application normally:

```bash
npm start
```

When the server starts successfully, the terminal displays:

```text
CampusLoop server running at http://localhost:3000
```

## 9. Open CampusLoop

Open a web browser and visit:

[http://localhost:3000](http://localhost:3000)

Available pages include:

- Home: `http://localhost:3000/`
- Sign Up: `http://localhost:3000/signup`
- Login: `http://localhost:3000/login`
- Marketplace: `http://localhost:3000/marketplace`

Register a student account through the Sign Up page, then log in to access protected features such as the dashboard and listing management.

## 10. Listing Image Uploads

Listing images are uploaded using Multer and stored in:

```text
public/uploads/listings/
```

The server creates this directory automatically if it does not already exist. The current upload configuration accepts JPG, PNG, and WEBP images up to 5 MB.

## 11. Troubleshooting

| Problem | What to check |
|---|---|
| Database connection error | Confirm MySQL Server is running and the `.env` database values are correct. |
| Access denied for MySQL user | Check `DB_USER` and `DB_PASSWORD`. |
| Unknown database | Execute `database/database_schema.sql` in MySQL Workbench. |
| Connection refused | Check the MySQL port in `.env`; the default in `.env.example` is `3306`. |
| Port 3000 is already in use | Stop the other process using that port or change `PORT` in `.env`. |
| Module not found | Run `npm install` from the project root. |

### Installing Project Dependencies

CampusLoop uses NPM (Node Package Manager) to manage its required libraries and packages.

All project dependencies are listed in the `package.json` file. After downloading or cloning the project, navigate to the project root directory and execute:

```bash
npm install
```

This command automatically downloads and installs all required dependencies, including Express.js, EJS, MySQL2, bcrypt, Multer, Nodemon, and other packages.

There is no need to install these libraries individually.

**Note:** The `node_modules` directory is generated automatically during installation and does not need to be included when sharing the project.


## 12. Project Entry Points and Important Files

- `src/server.js` – Main Express application and route definitions.
- `src/signup.js` – Student registration logic.
- `src/login.js` – Student login logic.
- `src/config/db.js` – MySQL connection pool configuration.
- `database/database_schema.sql` – Database and table creation script.
- `views/` – EJS page templates and reusable partials.
- `public/` – CSS, frontend assets, JavaScript, and uploaded images.
- `.env.example` – Example environment configuration.
- `package.json` – Project dependencies and run commands.

---

**CampusLoop – Connecting students, circulating resources, and simplifying campus exchanges.**
