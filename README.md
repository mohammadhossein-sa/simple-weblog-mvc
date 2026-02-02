```markdown
# 🎓 Educational Blog MVC + REST API Project

A complete, educational blog application built with **pure Vanilla JavaScript** using the **MVC (Model-View-Controller)** architecture pattern.  
This project is designed to clearly demonstrate core software engineering concepts: clean separation of concerns, the Observer pattern, RESTful API integration, client-side validation, reactive UI updates, and proper error/loading/success handling — all without any frameworks.

Perfect for learning modern JavaScript application architecture and full CRUD operations with a simple JSON-based backend.

## ✨ Key Features

- 🏗 **Strict MVC Architecture** — Clear separation: Model (data & API), View (UI & rendering), Controller (logic & coordination)
- 🔄 **Full CRUD Operations** — Create, Read, Update, Delete blog posts
- 🔔 **User Feedback** — Success toasts (green), error messages (red), and loading spinner
- ✏ **Modal-based Editing** — Clean edit interface in a modal window
- 🔍 **Client-side Form Validation** — Minimum length checks for title (≥3) & content (≥10)
- 👀 **Observer Pattern** — Automatic UI updates when data changes
- ⏳ **Loading & Error States** — Visual feedback during API requests
- 📱 **Responsive Design** — Mobile-friendly layout with clean CSS
- ⚡ **RESTful API** — Standard HTTP methods with proper status codes
- 🗄 **Simple JSON Persistence** — Data stored in a file (no database required)

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm

### Installation & Run

1. Clone the repository
```bash
git clone https://github.com/mohammadhossein-sa/simple-weblog-mvc.git
cd simple-weblog-mvc
```

2. Install dependencies
```bash
npm install
```

3. Start the server
```bash
# Simple start
npm start

# Development mode with auto-reload (recommended)
npm run dev
```

4. Open in browser
```
http://localhost:3001
```

## 📁 Project Structure

```
simple-weblog-mvc/
├── css/
│   └── style.css           # Responsive & modern UI styles
├── js/
│   ├── model.js            # Data layer — API calls, validation, state
│   ├── view.js             # UI layer — rendering, forms, modal, feedback
│   ├── controller.js       # Logic layer — coordinates Model ↔ View
│   └── app.js              # App bootstrap & observer setup
├── index.html              # Main HTML entry point
├── server.js               # Express.js REST API server
├── package.json
└── README.md
```

## 🏛 Architecture Overview

### MVC Pattern

```
┌─────────────┐      ┌──────────────┐      ┌─────────────┐
│   Model     │◄────►│  Controller  ├─────►│    View     │
│ - Data      │      │ - Business   │      │ - Rendering │
│ - API calls │      │   logic      │      │ - DOM       │
│ - Validation│      │ - Events     │      │ - Feedback  │
└─────────────┘      └──────────────┘      └─────────────┘
```

### Observer Pattern (Pub/Sub)

Used for loose coupling and reactive updates:
- Model notifies observers when data changes (e.g., new post created)
- View notifies when user interacts (form submit, button clicks)
- Controller handles coordination and side effects

## 🔌 REST API Endpoints

| Method | Endpoint            | Description                     |
|--------|---------------------|---------------------------------|
| GET    | `/api/posts`        | Get all blog posts              |
| POST   | `/api/posts`        | Create a new blog post          |
| PUT    | `/api/posts/:id`    | Update an existing post         |
| DELETE | `/api/posts/:id`    | Delete a blog post              |

```markdown
**Example response — Create Post (201 Created):**
```json
{
  "id": 14,
  "title": "My First Blog Post",
  "content": "This is a simple introduction to my blog using MVC architecture. Here I share thoughts on web development and JavaScript patterns.",
  "author": "Mohammadhossein",
  "createdAt": "2026-02-02T08:54:20.000Z"
}
```


## 🔧 Technologies & Concepts Demonstrated

### Frontend
- Vanilla JavaScript (ES6+ classes, async/await, fetch)
- HTML5 & CSS3 (flex, grid, CSS variables, animations)
- Observer / Pub-Sub pattern
- DOM manipulation & event delegation
- Client-side form validation
- Modal UI + success/error/loading feedback

### Backend
- Node.js
- Express.js (simple REST API server)
- JSON file persistence (lightweight, no database setup needed)

### Key Learning Concepts
- Separation of Concerns (SoC)
- MVC pattern in pure JavaScript
- Reactive UI with Observer pattern
- RESTful API design & integration
- Error handling & user feedback
- Responsive & accessible UI
- Async programming (fetch + async/await)

## 🛠 Development Scripts

```bash
# Start server (production)
npm start

# Development mode with auto-reload (recommended)
npm run dev
```

## 📚 Learning Outcomes

This project was built as part of a **Software Engineering** course to demonstrate:

- How to structure large JavaScript applications without frameworks
- Practical use of design patterns (MVC + Observer)
- Clean API integration and state management
- User-centered UI/UX feedback (loading, success, error states)
- Incremental development and debugging

## 👤 Author

**Mohammad hossein salmalian**  
GitHub: [@mohammadhossein-sa](https://github.com/mohammadhossein-sa)  
Repository: https://github.com/mohammadhossein-sa/simple-weblog-mvc.git  

Built with ❤️ for educational purposes — February 2026
```

