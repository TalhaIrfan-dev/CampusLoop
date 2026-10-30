# CampusLoop — Project Structure Guide

## 1. Introduction

This document explains the directory structure of the CampusLoop project and defines the purpose of each folder.

The main objective is to maintain an organized, modular and maintainable codebase throughout the development process.

All team members should follow this structure when creating new files or implementing features to ensure consistency and avoid unnecessary duplication.

## 2. Project Directory Structure

```text
CampusLoop/
│
├── README.md
├── LICENSE
├── .gitignore
│
├── docs/
│
├── public/
│   ├── pages/
│   ├── css/
│   ├── js/
│   └── assets/
│       ├── images/
│       └── icons/
│
├── src/
│
├── database/
│
└── tests/
```

**Note:** This is the initial project structure. Additional folders and files will be created as development progresses.

## 3. Root Directory

The root directory contains the main project files and folders.

| File / Folder | Purpose |
|---|---|
| `README.md` | Introduces CampusLoop, its objectives, features, technologies and project information. |
| `LICENSE` | Defines the permissions and conditions for using and modifying the project. |
| `.gitignore` | Specifies files and folders that Git should not track. |
| `docs/` | Stores project documentation and development records. |
| `public/` | Contains frontend files served to website visitors. |
| `src/` | Contains backend application source code. |
| `database/` | Stores database-related files, including SQL scripts. |
| `tests/` | Contains test cases and testing-related files. |

## 4. Documentation — `docs/`

This folder contains documents produced throughout the Software Development Life Cycle (SDLC).

It will help the team maintain project records and track development activities.

Planned organization:

```text
docs/
├── weekly-reports/
├── requirements/
├── design/
├── diagrams/
└── testing/
```

| Folder | Purpose |
|---|---|
| `weekly-reports/` | Weekly plans, completed activities and upcoming work. |
| `requirements/` | Functional and non-functional requirements. |
| `design/` | Architecture, design decisions and design documentation. |
| `diagrams/` | UML, ERD, flowcharts and other system diagrams. |
| `testing/` | Test plans, test reports and testing documentation. |

## 5. Frontend — `public/`

The `public/` directory contains the files responsible for the user interface and browser-side functionality.

It is divided into the following sections:

### 5.1 Pages — `public/pages/`

Contains the HTML pages of CampusLoop.

Examples:

- `index.html` — Home page.
- `login.html` — Login page.
- `register.html` — Registration page.
- `marketplace.html` — Marketplace page.
- `product-details.html` — Product details page.
- `create-listing.html` — Create listing page.
- `dashboard.html` — Student dashboard.

New HTML pages should be placed here.

### 5.2 CSS — `public/css/`

Contains stylesheets responsible for the appearance and layout of the website.

Planned files:

- `main.css` — Main stylesheet and shared styles.
- `variables.css` — CSS variables such as colors, fonts and spacing.
- `components.css` — Reusable component styles.
- `responsive.css` — Responsive layouts for different screen sizes.

### 5.3 JavaScript — `public/js/`

Contains frontend JavaScript code that executes in the user's browser.

It handles:

- User interactions.
- Form validation.
- Search and filtering.
- Dynamic content updates.
- API communication with the backend.

As the frontend grows, JavaScript files may be organized into feature-specific folders.

**Important:** Frontend JavaScript must not contain database credentials or directly communicate with the MySQL database.

### 5.4 Assets — `public/assets/`

Contains static resources used by the frontend.

| Folder | Purpose |
|---|---|
| `images/` | Logo, product images, banners and illustrations. |
| `icons/` | Icons and other small graphical resources. |

## 6. Backend — `src/`

The `src/` directory will contain the server-side application code.

If we use Node.js and Express.js, the backend will be organized into modules such as:

| Folder / File | Purpose |
|---|---|
| `config/` | Database connection and application configuration. |
| `routes/` | Defines backend API endpoints. |
| `controllers/` | Handles incoming requests and outgoing responses. |
| `services/` | Contains application and business logic. |
| `models/` | Handles database-related operations. |
| `middleware/` | Contains authentication, validation and error-handling middleware. |
| `utils/` | Contains reusable backend helper functions. |
| `app.js` | Configures the Express application. |
| `server.js` | Starts the backend server. |

**Important:** Backend JavaScript executes on the Node.js server, whereas JavaScript inside `public/js/` executes in the user's browser.

## 7. Database — `database/`

This folder will contain database-related resources.

Planned files and folders:

- `schema.sql` — Database tables and their structure.
- `seed.sql` — Initial or sample database records.
- `migrations/` — Scripts for managing database structure changes.

## 8. Testing — `tests/`

This folder will contain test-related resources.

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
| `test-cases/` | Stores documented test cases and related test data where appropriate. |

## 9. Development Guidelines

All team members should follow these guidelines:

1. Place files in their appropriate directories.
2. Keep frontend and backend code separate.
3. Organize code into reusable modules rather than placing everything in one file.
4. Use meaningful and consistent file names.
5. Avoid creating duplicate files or folders.
6. Update documentation when important structural changes are made.
7. Do not commit environment files containing passwords, database credentials or secret keys.
8. Follow the team's Git branching and pull request workflow before merging changes into `main`.

## 10. Maintaining the Structure

The project structure is not intended to be created completely in advance.

New folders and files should be introduced when required by the relevant development activity.

This incremental approach keeps the repository clean, avoids unnecessary empty files and allows the architecture to evolve with the project.

---

**CampusLoop Development Team**

*Connecting students, circulating resources, and simplifying campus exchanges.*