import React from 'react'
import { useNavigate, useParams, Navigate } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import InternForm from '../components/common/InternForm.jsx'

export default function EditIntern() {
  const { interns, updateIntern } = useApp()
  const { id } = useParams()
  const navigate = useNavigate()

  const intern = interns.find((i) => i.id === id)

  if (!intern) return <Navigate to="/interns" replace />

  function handleSubmit(values) {
    updateIntern(id, values)
    navigate('/interns')
  }

  return (
    <div className="form-page">
      <h2>Edit Intern</h2>
      <InternForm initialValues={intern} onSubmit={handleSubmit} submitLabel="Save Changes" />
    </div>
  )
}
