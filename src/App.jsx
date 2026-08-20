import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Interns from './pages/Interns.jsx'
import AddIntern from './pages/AddIntern.jsx'
import EditIntern from './pages/EditIntern.jsx'
import Tasks from './pages/Tasks.jsx'
import Profile from './pages/Profile.jsx'
import Layout from './components/Layout/Layout.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

function Protected({ title, children }) {
  return (
    <ProtectedRoute>
      <Layout title={title}>{children}</Layout>
    </ProtectedRoute>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Protected title="Dashboard"><Dashboard /></Protected>} />
      <Route path="/interns" element={<Protected title="Interns"><Interns /></Protected>} />
      <Route path="/interns/add" element={<Protected title="Add Intern"><AddIntern /></Protected>} />
      <Route path="/interns/edit/:id" element={<Protected title="Edit Intern"><EditIntern /></Protected>} />
      <Route path="/tasks" element={<Protected title="Task Management"><Tasks /></Protected>} />
      <Route path="/profile" element={<Protected title="Profile"><Profile /></Protected>} />
    </Routes>
  )
}
