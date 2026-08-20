import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'

export default function Interns() {
  const { interns, deleteIntern } = useApp()
  const [search, setSearch] = useState('')
  const [confirmId, setConfirmId] = useState(null)

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return interns
    return interns.filter((i) => i.name.toLowerCase().includes(q))
  }, [interns, search])

  function handleDelete(id) {
    deleteIntern(id)
    setConfirmId(null)
  }

  return (
    <div>
      <div className="page-toolbar">
        <input
          type="text"
          placeholder="Search intern by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        <Link to="/interns/add" className="btn btn--primary">
          + Add Intern
        </Link>
      </div>

      <div className="panel">
        {filtered.length === 0 ? (
          <p className="empty-state">No interns found.</p>
        ) : (
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Status</th>
                  <th>Joined</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((intern) => (
                  <tr key={intern.id}>
                    <td>{intern.name}</td>
                    <td>{intern.email}</td>
                    <td>{intern.department}</td>
                    <td>
                      <span className={`badge badge--${intern.status === 'Active' ? 'success' : 'neutral'}`}>
                        {intern.status}
                      </span>
                    </td>
                    <td>{intern.joinDate}</td>
                    <td className="table__actions">
                      <Link to={`/interns/edit/${intern.id}`} className="btn btn--ghost btn--sm">
                        Edit
                      </Link>
                      {confirmId === intern.id ? (
                        <>
                          <button className="btn btn--danger btn--sm" onClick={() => handleDelete(intern.id)}>
                            Confirm
                          </button>
                          <button className="btn btn--ghost btn--sm" onClick={() => setConfirmId(null)}>
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button className="btn btn--ghost btn--sm" onClick={() => setConfirmId(intern.id)}>
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
