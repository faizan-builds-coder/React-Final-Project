import React, { createContext, useContext, useEffect, useState } from 'react'

const AppContext = createContext(null)

const STORAGE_KEYS = {
  AUTH: 'bc_auth_user',
  INTERNS: 'bc_interns',
  TASKS: 'bc_tasks',
}

// Dummy/public seed data used the first time the app runs (per Day 7 requirement)
const SEED_INTERNS = [
  { id: 'i1', name: 'Ayesha Khan', email: 'ayesha.khan@example.com', department: 'Web Development', status: 'Active', joinDate: '2026-06-01' },
  { id: 'i2', name: 'Bilal Ahmed', email: 'bilal.ahmed@example.com', department: 'Digital Marketing', status: 'Active', joinDate: '2026-06-01' },
  { id: 'i3', name: 'Hina Raza', email: 'hina.raza@example.com', department: 'UI/UX Design', status: 'Completed', joinDate: '2026-04-15' },
  { id: 'i4', name: 'Usman Tariq', email: 'usman.tariq@example.com', department: 'Web Development', status: 'Active', joinDate: '2026-07-10' },
]

const SEED_TASKS = [
  { id: 't1', internId: 'i1', title: 'Build Login Page UI', status: 'Completed', dueDate: '2026-08-05' },
  { id: 't2', internId: 'i1', title: 'Implement Context API state', status: 'Pending', dueDate: '2026-08-20' },
  { id: 't3', internId: 'i2', title: 'SEO audit for landing page', status: 'Pending', dueDate: '2026-08-22' },
  { id: 't4', internId: 'i4', title: 'Setup routing structure', status: 'Completed', dueDate: '2026-08-10' },
]

function loadFromStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw)
  } catch {
    return fallback
  }
}

export function AppProvider({ children }) {
  const [user, setUser] = useState(() => loadFromStorage(STORAGE_KEYS.AUTH, null))
  const [interns, setInterns] = useState(() => loadFromStorage(STORAGE_KEYS.INTERNS, SEED_INTERNS))
  const [tasks, setTasks] = useState(() => loadFromStorage(STORAGE_KEYS.TASKS, SEED_TASKS))

  useEffect(() => {
    if (user) localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(user))
    else localStorage.removeItem(STORAGE_KEYS.AUTH)
  }, [user])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.INTERNS, JSON.stringify(interns))
  }, [interns])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks))
  }, [tasks])

  // ---- Auth ----
  function login(name, email) {
    setUser({ name, email, loggedInAt: new Date().toISOString() })
  }

  function logout() {
    setUser(null)
  }

  // ---- Intern CRUD ----
  function addIntern(intern) {
    const newIntern = { ...intern, id: 'i' + Date.now() }
    setInterns((prev) => [newIntern, ...prev])
  }

  function updateIntern(id, updates) {
    setInterns((prev) => prev.map((i) => (i.id === id ? { ...i, ...updates } : i)))
  }

  function deleteIntern(id) {
    setInterns((prev) => prev.filter((i) => i.id !== id))
    setTasks((prev) => prev.filter((t) => t.internId !== id))
  }

  // ---- Task CRUD ----
  function addTask(task) {
    const newTask = { ...task, id: 't' + Date.now(), status: 'Pending' }
    setTasks((prev) => [newTask, ...prev])
  }

  function toggleTaskStatus(id) {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, status: t.status === 'Completed' ? 'Pending' : 'Completed' } : t
      )
    )
  }

  function deleteTask(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }

  const value = {
    user,
    login,
    logout,
    interns,
    addIntern,
    updateIntern,
    deleteIntern,
    tasks,
    addTask,
    toggleTaskStatus,
    deleteTask,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
