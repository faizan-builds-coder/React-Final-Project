import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import DashboardCard from '../components/common/DashboardCard.jsx'

export default function Dashboard() {
  const { interns, tasks, user } = useApp()

  const stats = useMemo(() => {
    const totalInterns = interns.length
    const activeTasks = tasks.filter((t) => t.status !== 'Completed').length
    const completedTasks = tasks.filter((t) => t.status === 'Completed').length
    const pendingTasks = tasks.filter((t) => t.status === 'Pending').length
    return { totalInterns, activeTasks, completedTasks, pendingTasks }
  }, [interns, tasks])

  const recentInterns = interns.slice(0, 5)
  const recentTasks = tasks.slice(0, 5)

  return (
    <div>
      <p className="page-welcome">Welcome back, {user?.name?.split(' ')[0] || 'there'} 👋</p>

      <div className="stat-grid">
        <DashboardCard label="Total Interns" value={stats.totalInterns} accent="#3b5bfd" icon="◍" />
        <DashboardCard label="Active Tasks" value={stats.activeTasks} accent="#f5a524" icon="⏱" />
        <DashboardCard label="Completed Tasks" value={stats.completedTasks} accent="#17c964" icon="✓" />
        <DashboardCard label="Pending Tasks" value={stats.pendingTasks} accent="#f31260" icon="!" />
      </div>

      <div className="dashboard-grid">
        <section className="panel">
          <div className="panel__header">
            <h3>Recent Interns</h3>
            <Link to="/interns" className="link">View all</Link>
          </div>
          {recentInterns.length === 0 ? (
            <p className="empty-state">No interns added yet.</p>
          ) : (
            <ul className="simple-list">
              {recentInterns.map((i) => (
                <li key={i.id}>
                  <span className="simple-list__title">{i.name}</span>
                  <span className={`badge badge--${i.status === 'Active' ? 'success' : 'neutral'}`}>
                    {i.status}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="panel">
          <div className="panel__header">
            <h3>Recent Tasks</h3>
            <Link to="/tasks" className="link">View all</Link>
          </div>
          {recentTasks.length === 0 ? (
            <p className="empty-state">No tasks added yet.</p>
          ) : (
            <ul className="simple-list">
              {recentTasks.map((t) => (
                <li key={t.id}>
                  <span className="simple-list__title">{t.title}</span>
                  <span className={`badge badge--${t.status === 'Completed' ? 'success' : 'warning'}`}>
                    {t.status}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  )
}
