import React from 'react'
import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Dashboard', icon: '◧' },
  { to: '/interns', label: 'Interns', icon: '◍' },
  { to: '/interns/add', label: 'Add Intern', icon: '✚' },
  { to: '/tasks', label: 'Tasks', icon: '☑' },
  { to: '/profile', label: 'Profile', icon: '◐' },
]

export default function Sidebar({ open, onClose }) {
  return (
    <>
      <aside className={`sidebar ${open ? 'sidebar--open' : ''}`}>
        <div className="sidebar__brand">
          <span className="sidebar__logo">BC</span>
          <div>
            <p className="sidebar__title">Beta Communes</p>
            <p className="sidebar__subtitle">Intern Portal</p>
          </div>
        </div>
        <nav className="sidebar__nav">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) => `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`}
              onClick={onClose}
            >
              <span className="sidebar__icon">{link.icon}</span>
              {link.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      {open && <div className="sidebar__scrim" onClick={onClose} />}
    </>
  )
}
