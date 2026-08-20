import React, { useMemo, useState } from 'react'
import { useApp } from '../context/AppContext.jsx'

export default function Tasks() {
  const { tasks, interns, addTask, toggleTaskStatus, deleteTask } = useApp()
  const [filter, setFilter] = useState('All')
  const [title, setTitle] = useState('')
  const [internId, setInternId] = useState(interns[0]?.id || '')
  const [dueDate, setDueDate] = useState('')
  const [error, setError] = useState('')

  const filteredTasks = useMemo(() => {
    if (filter === 'All') return tasks
    return tasks.filter((t) => t.status === filter)
  }, [tasks, filter])

  function handleAddTask(e) {
    e.preventDefault()
    if (!title.trim() || !internId) {
      setError('Please enter a task title and select an intern.')
      return
    }
    setError('')
    addTask({ title: title.trim(), internId, dueDate: dueDate || new Date().toISOString().slice(0, 10) })
    setTitle('')
    setDueDate('')
  }

  function internName(id) {
    return interns.find((i) => i.id === id)?.name || 'Unassigned'
  }

  return (
    <div>
      <div className="panel">
        <div className="panel__header">
          <h3>Add Task</h3>
        </div>
        <form onSubmit={handleAddTask} className="form form--inline">
          <input
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="search-input"
          />
          <select value={internId} onChange={(e) => setInternId(e.target.value)}>
            {interns.map((i) => (
              <option key={i.id} value={i.id}>
                {i.name}
              </option>
            ))}
          </select>
          <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
          <button type="submit" className="btn btn--primary">
            Add Task
          </button>
        </form>
        {error && <p className="form__error">{error}</p>}
      </div>

      <div className="page-toolbar">
        <div className="filter-group">
          {['All', 'Pending', 'Completed'].map((f) => (
            <button
              key={f}
              className={`filter-chip ${filter === f ? 'filter-chip--active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="panel">
        {filteredTasks.length === 0 ? (
          <p className="empty-state">No tasks in this view.</p>
        ) : (
          <ul className="task-list">
            {filteredTasks.map((task) => (
              <li key={task.id} className="task-item">
                <label className="task-item__check">
                  <input
                    type="checkbox"
                    checked={task.status === 'Completed'}
                    onChange={() => toggleTaskStatus(task.id)}
                  />
                  <span className={task.status === 'Completed' ? 'task-item__title task-item__title--done' : 'task-item__title'}>
                    {task.title}
                  </span>
                </label>
                <span className="task-item__meta">{internName(task.internId)}</span>
                <span className="task-item__meta">Due: {task.dueDate}</span>
                <span className={`badge badge--${task.status === 'Completed' ? 'success' : 'warning'}`}>
                  {task.status}
                </span>
                <button className="btn btn--ghost btn--sm" onClick={() => deleteTask(task.id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
