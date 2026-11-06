
import { useState } from 'react'

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState('medium')
  const [message, setMessage] = useState('')

  function handleSubmit(e) {
    e.preventDefault()

    const cleanTitle = title.trim()

    if (!cleanTitle) {
      setMessage('Please enter a task title.')
      return
    }

    onAdd(cleanTitle, priority)

    setTitle('')
    setPriority('medium')
    setMessage('Task added successfully!')
  }

  return (
    <div className="task-form-container">
      <form onSubmit={handleSubmit} className="task-form">
        <label htmlFor="new-task">New task</label>

        <input
          id="new-task"
          type="text"
          value={title}
          placeholder="What needs to be done?"
          onChange={(e) => {
            setTitle(e.target.value)
            setMessage('')
          }}
          maxLength={100}
        />

        <label htmlFor="priority">Priority</label>

        <select
          id="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <button type="submit">Add Task</button>
      </form>

      {message && (
        <p className="form-message" role="status">
          {message}
        </p>
      )}
    </div>
  )
}
