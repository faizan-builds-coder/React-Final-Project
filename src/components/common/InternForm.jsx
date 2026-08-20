import React, { useState } from 'react'

const DEPARTMENTS = ['Web Development', 'Digital Marketing', 'UI/UX Design', 'App Development', 'Data Science']

export default function InternForm({ initialValues, onSubmit, submitLabel }) {
  const [values, setValues] = useState(
    initialValues || {
      name: '',
      email: '',
      department: DEPARTMENTS[0],
      status: 'Active',
      joinDate: new Date().toISOString().slice(0, 10),
    }
  )
  const [error, setError] = useState('')

  function handleChange(field, value) {
    setValues((prev) => ({ ...prev, [field]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!values.name.trim() || !values.email.trim()) {
      setError('Name and email are required.')
      return
    }
    setError('')
    onSubmit(values)
  }

  return (
    <form onSubmit={handleSubmit} className="form form--card">
      <label className="form__field">
        <span>Full Name</span>
        <input
          type="text"
          value={values.name}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="Intern's full name"
        />
      </label>

      <label className="form__field">
        <span>Email</span>
        <input
          type="email"
          value={values.email}
          onChange={(e) => handleChange('email', e.target.value)}
          placeholder="intern@example.com"
        />
      </label>

      <label className="form__field">
        <span>Department</span>
        <select value={values.department} onChange={(e) => handleChange('department', e.target.value)}>
          {DEPARTMENTS.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </label>

      <label className="form__field">
        <span>Status</span>
        <select value={values.status} onChange={(e) => handleChange('status', e.target.value)}>
          <option value="Active">Active</option>
          <option value="Completed">Completed</option>
        </select>
      </label>

      <label className="form__field">
        <span>Join Date</span>
        <input
          type="date"
          value={values.joinDate}
          onChange={(e) => handleChange('joinDate', e.target.value)}
        />
      </label>

      {error && <p className="form__error">{error}</p>}

      <button type="submit" className="btn btn--primary btn--block">
        {submitLabel}
      </button>
    </form>
  )
}
