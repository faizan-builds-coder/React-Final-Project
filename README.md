# Beta Communes — Intern Management Portal

Final project for the **Beta Communes React JS Internship Program — Day 7**.
A complete React application for managing interns and their tasks, built with
React, React Router DOM, Context API, and localStorage persistence.

## ✨ Features

- **Login Page** — simple authentication gate (name, email, password) that
  persists the session in localStorage.
- **Dashboard Home** — summary cards for Total Interns, Active Tasks,
  Completed Tasks and Pending Tasks, plus recent-activity panels.
- **Intern List** — searchable table of all interns with status badges.
- **Add / Edit / Delete Intern** — full CRUD backed by Context API +
  localStorage.
- **Task Management** — add tasks and assign them to an intern.
- **Completed / Pending Task View** — filter chips (All / Pending / Completed)
  and one-click checkbox to toggle task status.
- **Profile / Logout** — shows the logged-in user and portal stats, with a
  logout action.
- **Responsive Layout** — collapsible sidebar + navbar that adapts down to
  mobile.

## 🧱 Tech Stack

- React 18 (Vite)
- React Router DOM (routing + protected routes)
- Context API (global state: auth, interns, tasks)
- localStorage (data persistence across reloads)
- Plain CSS (custom design system, no external UI kit)

## 📁 Folder Structure

```
react-final-project/
├── src/
│   ├── components/
│   │   ├── Layout/          # Sidebar, Navbar, Layout wrapper
│   │   ├── common/          # DashboardCard, InternForm (reusable)
│   │   └── ProtectedRoute.jsx
│   ├── context/
│   │   └── AppContext.jsx   # auth + intern + task state & CRUD
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Interns.jsx
│   │   ├── AddIntern.jsx
│   │   ├── EditIntern.jsx
│   │   ├── Tasks.jsx
│   │   └── Profile.jsx
│   ├── App.jsx               # route definitions
│   ├── main.jsx               # entry point
│   └── index.css              # global styles
├── index.html
├── package.json
└── vite.config.js
```

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open the printed local URL in your browser. Log in with any name, email and
password — this is a demo portal, so there's no real backend.

To build for production:

```bash
npm run build
npm run preview
```

## 📸 Screenshots

_Add screenshots of the Login page, Dashboard, Intern List and Task
Management screen here before submitting._

| Login | Dashboard |
|---|---|
| _screenshot_ | _screenshot_ |

| Interns | Tasks |
|---|---|
| _screenshot_ | _screenshot_ |

## 📦 Submission

- Repository: `react-final-project`
- Submitted on the Beta Communes Portal with the GitHub repository link.
