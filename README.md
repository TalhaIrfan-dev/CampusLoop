# CampusLoop ♻️
### University Peer-to-Peer Marketplace with Smart Delivery

CampusLoop is a university-focused peer-to-peer marketplace designed to connect students within a campus community. It provides a platform where students can buy, sell, exchange, donate, and discover useful items from other students.

The project aims to encourage reuse, reduce waste, and make student-to-student transactions more organized and accessible.

One of its distinguishing concepts is a **Smart Delivery Recommendation System**, which aims to recommend suitable delivery methods based on item characteristics and delivery requirements.

---

## 🎯 Project Objectives

- Create a centralized marketplace for university students.
- Facilitate buying, selling, exchanging, and donating items.
- Make it easier for students to discover items they need.
- Introduce a smart, rule-based delivery recommendation mechanism.
- Encourage reuse and circulation of useful products within the campus community.
- Provide a convenient and user-friendly experience.

---

## ✨ Project Features

CampusLoop is being developed incrementally. The following features represent the current implementation and planned functionality.

### Implemented Features

- **Student Authentication:** Student registration, login, password hashing, session management, and logout.
- **Student Dashboard:** Display personalized information for the authenticated student.
- **Campus Marketplace:** Browse dynamically loaded listings from the database.
- **Product Listings:** Create, view, edit, and delete marketplace listings.
- **Search & Filtering:** Search products and filter listings by category, listing type, and condition.
- **Sorting:** Sort marketplace listings by relevant criteria, including price and listing date.
- **Product Details:** View detailed item information and seller details.
- **My Listings:** View and manage listings created by the currently logged-in student.
- **Image Uploads:** Upload and store listing images using Multer.
- **Protected Routes:** Restrict access to private pages and enforce listing ownership.

### Planned Features

- **Peer-to-Peer Transactions:** Support buying, selling, exchanging, and donating items.
- **Offers & Requests:** Allow students to negotiate offers and request needed items.
- **Smart Delivery Recommendation:** Suggest suitable delivery options based on item and delivery requirements.
- **Delivery Management:** Manage delivery assignments and status updates.
- **Enhanced User Dashboard:** Display relevant marketplace and transaction activities.
- **Role-Based Access:** Provide appropriate interfaces and functionality for different user roles.

The planned features will be refined during requirement analysis and subsequent development phases.

---

## 🎨 Design Direction

CampusLoop follows a **Modern Green** visual design direction.

The design focuses on a clean, minimal, friendly, and professional user experience.

| Design Element | Selection |
|---|---|
| Theme | Modern Green |
| Primary Color | Forest Green (`#176B50`) |
| Background | Off White (`#F8F9F6`) |
| Typography | Poppins and Inter |
| Design Style | Clean and Minimal |
| Layout | Responsive and reusable components |

The visual identity reflects sustainability, resource circulation, and the university community.

---

## 🛠️ Technology Stack

CampusLoop uses the following technologies:

| Layer | Technology | Purpose |
|---|---|---|
| Frontend | HTML5 | Page structure |
| Frontend | CSS3 | Styling and responsive layouts |
| Frontend | JavaScript (ES6+) | Client-side functionality |
| Templating | EJS | Dynamic page rendering |
| Backend | Node.js | Server-side runtime |
| Backend | Express.js | Routing and application logic |
| Database | MySQL | Relational data storage |
| Database Tool | MySQL Workbench | Database management |
| Authentication | bcrypt | Password hashing |
| Session Management | express-session | User session handling |
| File Uploads | Multer | Listing image uploads |
| Configuration | dotenv | Environment variable management |

---

## 👥 Team Members

| Member | Role |
|---|---|
| Talha Irfan | Project Development |
| Muhammad Waleed | Project Development |

Both members collaborate throughout the development lifecycle, including planning, implementation, testing, and documentation.

---

## 📂 Project Structure

CampusLoop follows a modular project structure to maintain separation of concerns and make development easier to manage.

```text
CampusLoop/
│
├── README.md
├── LICENSE
├── .gitignore
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
│   └── partials/
│
├── public/
│   ├── css/
│   ├── js/
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

**Directory responsibilities:**

- `config/` — Database connection and configuration.
- `src/` — Backend application code, including server configuration and authentication routes.
- `views/` — EJS templates, including application pages and reusable partials.
- `public/` — Static frontend resources, stylesheets, browser-side JavaScript, and uploaded listing images.
- `database/` — Database schemas, SQL scripts, and related resources.
- `docs/` — Project documentation, requirements, diagrams, design decisions, and progress reports.
- `tests/` — Test cases and testing-related resources.

The structure will be expanded incrementally as development progresses.

For more information about directory responsibilities and development conventions, see [`docs/PROJECT_STRUCTURE.md`](docs/PROJECT_STRUCTURE.md).

---

## ⚙️ Installation and Setup

Follow these steps to run CampusLoop locally.

### Prerequisites

Make sure you have installed:

- Node.js
- npm
- MySQL Server
- MySQL Workbench

### 1. Clone the Repository

```bash
git clone https://github.com/TalhaIrfan-dev/CampusLoop.git
```

Navigate to the project directory:

```bash
cd CampusLoop
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root using `.env.example` as a reference.

Configure your MySQL credentials and session secret.

### 4. Configure the Database

- Start MySQL Server.
- Open MySQL Workbench.
- Create the CampusLoop database.
- Execute the database schema scripts available in the `database/` directory.

### 5. Start the Application

```bash
npm run dev
```

Open the application in your browser:

```text
http://localhost:3000
```

---

## 🚀 Project Development

CampusLoop is being developed through a structured Software Development Life Cycle (SDLC), covering the following phases:

1. Requirement Analysis
2. Project Planning
3. System Design
4. Implementation
5. Testing and Quality Assurance
6. Documentation and Finalization

The project follows an iterative development approach, with activities, decisions, and progress documented throughout its development.

---

## 📊 Project Documentation

Project-related documentation, including requirements, design documents, diagrams, testing records, and weekly progress reports, is maintained in the [`docs/`](docs/) directory.

For information about repository organization, refer to [`docs/PROJECT_STRUCTURE.md`](docs/PROJECT_STRUCTURE.md).

---

## 🎓 Academic Information

This project is being developed as a semester project for the **Web Engineering** course as part of the **BS Software Engineering** program at **Sukkur IBA University**, Fall 2026.

The project provides an opportunity to apply practical Web Engineering concepts through the development of a collaborative, real-world-inspired web application.

---

**CampusLoop — Connecting students, circulating resources, and simplifying campus exchanges.** ♻️