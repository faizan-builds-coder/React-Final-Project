import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'

export default function Profile() {
  const { user, logout, interns, tasks } = useApp()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <div className="form-page">
      <h2>Profile</h2>
      <div className="panel profile-card">
        <div className="profile-card__avatar">{user?.name?.charAt(0)?.toUpperCase() || 'U'}</div>
        <div className="profile-card__info">
          <p className="profile-card__name">{user?.name}</p>
          <p className="profile-card__email">{user?.email}</p>
          <p className="profile-card__meta">
            Logged in since {user?.loggedInAt ? new Date(user.loggedInAt).toLocaleString() : '-'}
          </p>
        </div>
      </div>

      <div className="stat-grid">
        <div className="stat-card" style={{ '--accent': '#3b5bfd' }}>
          <div className="stat-card__icon">◍</div>
          <div>
            <p className="stat-card__value">{interns.length}</p>
            <p className="stat-card__label">Interns Managed</p>
          </div>
        </div>
        <div className="stat-card" style={{ '--accent': '#17c964' }}>
          <div className="stat-card__icon">✓</div>
          <div>
            <p className="stat-card__value">{tasks.filter((t) => t.status === 'Completed').length}</p>
            <p className="stat-card__label">Tasks Completed</p>
          </div>
        </div>
      </div>

      <button className="btn btn--danger" onClick={handleLogout}>
        Logout
      </button>
    </div>
  )
}
