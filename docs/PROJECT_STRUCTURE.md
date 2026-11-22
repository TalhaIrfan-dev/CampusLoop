# CampusLoop — Project Structure Guide

## 1. Introduction

This document explains the directory structure of the CampusLoop project and defines the purpose of each folder and important file.

The main objective is to maintain an organized, modular, and maintainable codebase throughout the development process.

All team members should follow this structure when creating new files or implementing features to ensure consistency and avoid unnecessary duplication.

As CampusLoop evolves, its directory structure will be updated to reflect new functionality and architectural requirements.

---

## 2. Project Directory Structure

The current project structure is organized as follows:

```text
CampusLoop/
│
├── README.md
├── LICENSE
├── .gitignore
├── .env
├── .env.example
├── package.json
├── package-lock.json
│
│
├── src/
│   ├── config/
│   │   └── db.js
│   ├── server.js
│   ├── signup.js
│   └── login.js
│
├── views/
│   ├── pages/
│   │   ├── home.ejs
│   │   ├── login.ejs
│   │   ├── signup.ejs
│   │   ├── marketplace.ejs
│   │   ├── product-detail.ejs
│   │   ├── add-listing.ejs
│   │   ├── dashboard.ejs
│   │   ├── my-listings.ejs
│   │   └── edit-listing.ejs
│   │
│   └── partials/
│       ├── navbar.ejs
│       ├── footer.ejs
│       └── auth-header.ejs
│
├── public/
│   ├── css/
│   │   └── style.css
│   │
│   ├── js/
│   │
│   ├── assets/
│   │   ├── images/
│   │   └── icons/
│   │
│   └── uploads/
│       └── listings/
│
├── database/
│
├── docs/
│
└── tests/
```

**Note:** This structure represents the current application organization. Additional files and folders may be introduced as new features are implemented.

The `.env` file is local configuration and must not be committed to GitHub. The `.env.example` file provides a reference for configuring the application.

---

## 3. Root Directory

The root directory contains the main project configuration files and folders.

| File / Folder | Purpose |
|---|---|
| `README.md` | Introduces CampusLoop, its objectives, features, technologies, and setup instructions. |
| `LICENSE` | Defines permissions and conditions for using and modifying the project. |
| `.gitignore` | Specifies files and folders that Git should not track. |
| `.env` | Stores local environment variables and sensitive configuration. |
| `.env.example` | Provides example environment variables without actual credentials. |
| `package.json` | Defines project dependencies, metadata, and npm scripts. |
| `package-lock.json` | Maintains the exact dependency versions installed by npm. |
| `config/` | Contains application configuration, including database connectivity. |
| `src/` | Contains backend application source code. |
| `views/` | Contains EJS templates used for dynamic page rendering. |
| `public/` | Contains static frontend resources and user-uploaded files. |
| `database/` | Stores database schemas, SQL scripts, and related resources. |
| `docs/` | Stores project documentation and development records. |
| `tests/` | Contains test cases and testing-related resources. |

---

## 4. Configuration — `config/`

This directory contains configuration files required by the application.

### Current organization

```text
config/
└── db.js
```

| File | Purpose |
|---|---|
| `db.js` | Establishes the MySQL database connection and makes it available to the backend application. |

Database credentials and connection settings are loaded through environment variables rather than being hardcoded into application files.

---

## 5. Backend — `src/`

The `src/` directory contains the server-side application code.

CampusLoop uses Node.js and Express.js to handle application routing, authentication, database operations, and other server-side functionality.

### Current organization

```text
src/
├── server.js
├── signup.js
└── login.js
```

| File | Purpose |
|---|---|
| `server.js` | Configures the Express application, middleware, session handling, page routes, and protected routes. |
| `signup.js` | Handles student registration and the creation of student accounts. |
| `login.js` | Handles student authentication and login functionality. |

### Future backend organization

As the application grows, the backend may be further organized into modules such as:

| Folder / File | Purpose |
|---|---|
| `routes/` | Defines application endpoints and routes. |
| `controllers/` | Handles incoming requests and outgoing responses. |
| `models/` | Handles database-related operations. |
| `services/` | Contains reusable application and business logic. |
| `middleware/` | Contains authentication, validation, and error-handling middleware. |
| `utils/` | Contains reusable backend helper functions. |

These folders are not required to be created in advance. They should be introduced when the complexity of the application justifies additional separation.

**Important:** Backend JavaScript executes on the Node.js server, whereas JavaScript inside `public/js/` executes in the user's browser.

---

## 6. Views — `views/`

The `views/` directory contains the EJS templates responsible for rendering the application's user interface.

Unlike static HTML pages, EJS allows the server to dynamically display information retrieved from the database.

The directory is divided into two main sections.

### 6.1 Pages — `views/pages/`

Contains the main application pages.

Current pages include:

| File | Purpose |
|---|---|
| `home.ejs` | Displays the CampusLoop homepage. |
| `login.ejs` | Provides the student login interface. |
| `signup.ejs` | Provides the student registration interface. |
| `marketplace.ejs` | Displays dynamically loaded marketplace listings. |
| `product-detail.ejs` | Displays individual listing information and seller details. |
| `add-listing.ejs` | Provides the form for creating a new listing. |
| `dashboard.ejs` | Displays personalized information for the authenticated student. |
| `my-listings.ejs` | Displays listings created by the logged-in student. |
| `edit-listing.ejs` | Provides the interface for editing an existing listing. |

New application pages should be placed inside this directory.

### 6.2 Partials — `views/partials/`

Contains reusable EJS components shared across multiple pages.

Current organization:

```text
partials/
├── navbar.ejs
├── footer.ejs
└── auth-header.ejs
```

| File | Purpose |
|---|---|
| `navbar.ejs` | Provides the shared navigation bar. |
| `footer.ejs` | Provides the shared website footer. |
| `auth-header.ejs` | Provides the header used on authentication pages. |

Using partials helps maintain consistency and avoids repeating the same interface code across multiple pages.

---

## 7. Frontend Resources — `public/`

The `public/` directory contains static resources served directly to the browser.

It is organized into the following sections.

### 7.1 CSS — `public/css/`

Contains stylesheets responsible for the appearance and layout of the website.

Current file:

- `style.css` — Contains the application's shared styles, page layouts, components, and responsive styling.

Additional stylesheets may be introduced if the styling becomes sufficiently large to justify separation.

### 7.2 JavaScript — `public/js/`

Contains frontend JavaScript code that executes in the user's browser.

It may handle:

- User interactions.
- Client-side form validation.
- Search and filtering interactions.
- Dynamic interface updates.
- API communication with the backend.

As frontend functionality grows, JavaScript files may be organized into feature-specific modules.

**Important:** Frontend JavaScript must not contain database credentials or directly communicate with the MySQL database. Database operations must be handled by the backend.

### 7.3 Assets — `public/assets/`

Contains static resources used by the frontend.

| Folder | Purpose |
|---|---|
| `images/` | Stores developer-managed images such as logos, banners, illustrations, and other static graphics. |
| `icons/` | Stores icons and other small graphical resources. |

### 7.4 User Uploads — `public/uploads/`

Contains files uploaded by application users.

Current organization:

```text
uploads/
└── listings/
```

| Folder | Purpose |
|---|---|
| `listings/` | Stores images uploaded by students when creating marketplace listings. |

Listing images are uploaded through Multer and their corresponding file paths are stored in the database.

**Important distinction:**

- `public/assets/` contains static resources managed by the development team.
- `public/uploads/` contains dynamic files uploaded by application users.

These directories should remain separate to maintain a clear distinction between application assets and user-generated content.

---

## 8. Database — `database/`

This directory contains database-related resources for CampusLoop.

The application uses MySQL for storing student accounts, marketplace listings, and other application data.

As database development progresses, this directory may contain:

```text
database/
├── schema.sql
├── seed.sql
└── migrations/
```

| File / Folder | Purpose |
|---|---|
| `schema.sql` | Contains SQL statements for creating database tables and defining their structure. |
| `seed.sql` | Contains sample records used for development and testing. |
| `migrations/` | Contains scripts for managing database structure changes. |

Database scripts should be maintained separately from backend application code.

---

## 9. Testing — `tests/`

This directory contains test-related resources.

As testing activities progress, it may be organized into:

```text
tests/
├── unit/
├── integration/
└── test-cases/
```

| Folder | Purpose |
|---|---|
| `unit/` | Tests individual functions or modules. |
| `integration/` | Tests interactions between different application components. |
| `test-cases/` | Stores documented test cases and related testing resources. |

Testing organization may evolve depending on the testing tools and requirements selected by the team.

---

## 10. Development Guidelines

All team members should follow these guidelines:

1. Place files in their appropriate directories.
2. Keep frontend and backend code separate.
3. Use EJS templates for dynamically rendered application pages.
4. Keep reusable interface components inside `views/partials/`.
5. Organize code into reusable modules rather than placing everything in one file.
6. Use meaningful and consistent file names.
7. Avoid creating duplicate files or unnecessary folders.
8. Keep database credentials and sensitive configuration inside environment variables.
9. Never commit the actual `.env` file or other sensitive credentials.
10. Update documentation when important structural changes are made.
11. Follow the team's Git branching and Pull Request workflow before merging changes into `main`.

---

## 11. Maintaining the Structure

The project structure is not intended to be created completely in advance.

New folders and files should be introduced when required by the relevant development activity.

This incremental approach keeps the repository clean, avoids unnecessary empty files, and allows the architecture to evolve with the project.

The current structure reflects the implementation stage of CampusLoop, while future modules will be introduced as additional functionality is developed.

---

**CampusLoop Development Team**

*Connecting students, circulating resources, and simplifying campus exchanges.* ♻️