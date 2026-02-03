# 🎓 Simple Weblog MVC + REST API Project


A full-stack blog application built with **pure Vanilla JavaScript** and **MVC (Model-View-Controller)** architecture.  
This project features a clean RESTful API, complete CRUD operations, responsive UI with modal editing, real-time feedback (success toasts, loading states, errors), and simple JSON-based persistence — all without any frameworks.

[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue?style=for-the-badge&logo=github)](https://github.com/mohammadhossein-sa/simple-weblog-mvc.git)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?style=for-the-badge&logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Node.js](https://img.shields.io/badge/Node.js-Express-green?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![License](https://img.shields.io/badge/Educational-Project-purple?style=for-the-badge)](./LICENSE)

## ✨ Key Features

| Category | Features |
|----------|----------|
| **🏗 Architecture** | Pure MVC + Observer Pattern |
| **🔧 Operations** | Full CRUD + RESTful API |
| **🎨 User Interface** | Responsive + Edit Modal + Toast Notifications |
| **🛡 Validation** | Title (≥3) & Content (≥10) character checks |
| **⚡ Performance** | Smart Loading + Error Handling |
| **📁 Storage** | JSON File + No Database Required |

## 🚀 Quick Start

### Prerequisites
- Node.js version 14 or higher
- npm or yarn

### Installation & Run

```bash
# 1. Clone the repository
git clone https://github.com/mohammadhossein-sa/simple-weblog-mvc.git
cd simple-weblog-mvc

# 2. Install dependencies
npm install

# 3. Run the project
npm start          # Production mode
npm run dev        # Development mode (recommended)
```

Then open your browser and navigate to:
```
http://localhost:3001
```

## 📁 Project Structure

```
simple-weblog-mvc/
├── 📂 css/
│   └── style.css           # Modern responsive styles
├── 📂 js/
│   ├── model.js            # Data layer - API & validation
│   ├── view.js             # View layer - rendering & UI
│   ├── controller.js       # Logic layer - coordinator
│   └── app.js              # Bootstrap & Observer setup
├── 📜 index.html           # Main entry point
├── 📜 server.js            # Express.js server
├── 📜 package.json
└── 📜 README.md
```

## 🏛 Architecture Overview

### MVC + Observer Pattern

```
┌─────────────────────────────────────────────────┐
│                    View                         │
│  • UI Rendering                                │
│  • Forms & Modal                               │
│  • Message Display                             │
└───────────────┬─────────────────────────────────┘
                │
                │ Event Trigger
                ▼
┌─────────────────────────────────────────────────┐
│               Controller                         │
│  • Business Logic Management                    │
│  • Model ↔ View Coordination                    │
│  • Event Processing                             │
└───────────────┬─────────────────────────────────┘
                │
                │ Data Request/Update
                ▼
┌─────────────────────────────────────────────────┐
│                    Model                         │
│  • API Communication                            │
│  • Data Validation                              │
│  • State Management                             │
└─────────────────────────────────────────────────┘
```

### Observer Pattern
- Model notifies on data changes
- View reports user interactions
- Controller coordinates everything

## 🔌 REST API Endpoints

| Method | Endpoint | Description | Status Code |
|--------|----------|-------------|-------------|
| `GET` | `/api/posts` | Get all blog posts | `200 OK` |
| `POST` | `/api/posts` | Create new post | `201 Created` |
| `PUT` | `/api/posts/:id` | Update existing post | `200 OK` |
| `DELETE` | `/api/posts/:id` | Delete post | `204 No Content` |

**Example API Response (Create Post):**
```json
{
  "id": 14,
  "title": "My First Blog Post",
  "content": "A simple introduction to my blog using MVC architecture.",
  "author": "Mohammadhossein",
  "createdAt": "2026-02-02T08:54:20.000Z"
}
```

## 🛠 Technologies Used

### Frontend
- **Pure JavaScript** (ES6+, async/await, fetch)
- **HTML5 & CSS3** (Flexbox, Grid, Variables, Animations)
- **Design Patterns** (Observer/Pub-Sub, MVC)
- **DOM Manipulation** & Event Handling

### Backend
- **Node.js** with **Express.js**
- **JSON File Persistence** (Lightweight, no database setup)

### Educational Concepts
- Separation of Concerns (SoC)
- Reactive Programming
- RESTful API Design
- Error Handling & User Feedback
- Accessible User Interface

## 📚 Learning Outcomes

This project was developed as part of a **Software Engineering** course to demonstrate:

✅ **Structuring large JavaScript applications without frameworks**  
✅ **Practical use of design patterns (MVC + Observer)**  
✅ **State management and API integration**  
✅ **Incremental development and debugging**  
✅ **Focus on User Experience (UX) and visual feedback**

## 🧩 Development Scripts

```bash
# Run server in Production mode
npm start

# Run server in Development mode with auto-reload
npm run dev
```

## 👤 Author & License

**👨‍💻 Mohammad Hossein Salmalian**  
[![GitHub](https://img.shields.io/badge/GitHub-Profile-black?style=flat&logo=github)](https://github.com/mohammadhossein-sa)  
[![Repository](https://img.shields.io/badge/Repository-Link-green?style=flat)](https://github.com/mohammadhossein-sa/simple-weblog-mvc.git)

---

**📌 Note:** This project is developed for **educational purposes** to demonstrate software engineering concepts.  
Built with ❤️ for the developer community - February 2026
