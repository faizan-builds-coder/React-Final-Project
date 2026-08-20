import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import InternForm from '../components/common/InternForm.jsx'

export default function AddIntern() {
  const { addIntern } = useApp()
  const navigate = useNavigate()

  function handleSubmit(values) {
    addIntern(values)
    navigate('/interns')
  }

  return (
    <div className="form-page">
      <h2>Add New Intern</h2>
      <InternForm onSubmit={handleSubmit} submitLabel="Add Intern" />
    </div>
  )
}
