import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'

export default function Login() {
  const { user, login } = useApp()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  if (user) return <Navigate to="/" replace />

  function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError('Please fill in all fields to continue.')
      return
    }
    setError('')
    login(name.trim(), email.trim())
    navigate('/')
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-card__brand">
          <span className="sidebar__logo">BC</span>
          <p>Beta Communes</p>
        </div>
        <h2>Intern Management Portal</h2>
        <p className="auth-card__subtitle">Sign in to manage interns and tasks.</p>

        <form onSubmit={handleSubmit} className="form">
          <label className="form__field">
            <span>Full Name</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Faizan Ali"
            />
          </label>
          <label className="form__field">
            <span>Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </label>
          <label className="form__field">
            <span>Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </label>

          {error && <p className="form__error">{error}</p>}

          <button type="submit" className="btn btn--primary btn--block">
            Log In
          </button>
        </form>
        <p className="auth-card__hint">Demo portal — any name, email &amp; password will log you in.</p>
      </div>
    </div>
  )
}
