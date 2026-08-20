import React, { useState } from 'react'
import Sidebar from './Sidebar.jsx'
import Navbar from './Navbar.jsx'

export default function Layout({ children, title }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="app-shell">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="app-shell__main">
        <Navbar onMenuClick={() => setSidebarOpen((v) => !v)} title={title} />
        <main className="app-shell__content">{children}</main>
      </div>
    </div>
  )
}
