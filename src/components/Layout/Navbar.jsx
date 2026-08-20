import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext.jsx'

export default function Navbar({ onMenuClick, title }) {
  const { user, logout } = useApp()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <header className="navbar">
      <button className="navbar__menu" onClick={onMenuClick} aria-label="Toggle menu">
        ☰
      </button>
      <h1 className="navbar__title">{title}</h1>
      <div className="navbar__right">
        <div className="navbar__user">
          <span className="navbar__avatar">{user?.name?.charAt(0)?.toUpperCase() || 'U'}</span>
          <span className="navbar__username">{user?.name}</span>
        </div>
        <button className="btn btn--ghost" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  )
}
