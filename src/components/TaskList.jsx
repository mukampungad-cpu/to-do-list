
import { useState } from 'react'

export function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(task.title)

  const handleSave = (event) => {
    event.preventDefault()

    if (!editTitle.trim()) {
      alert('Task title cannot be empty!')
      return
    }

    onEdit(task.id, editTitle)
    setIsEditing(false)
  }

  const handleDelete = () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${task.title}"?`
    )

    if (confirmed) {
      onDelete(task.id)
    }
  }

  return (
    <li className={`task-item ${task.done ? 'done' : ''}`}>
      <input
        type="checkbox"
        id={task.id}
        checked={task.done}
        onChange={() => onToggle(task.id)}
        aria-label={`Mark ${task.title} as completed`}
      />

      {isEditing ? (
        <form onSubmit={handleSave} className="edit-form">
          <input
            type="text"
            value={editTitle}
            onChange={(event) => setEditTitle(event.target.value)}
            autoFocus
            aria-label="Edit task title"
          />
          <button type="submit">Save</button>
          <button
            type="button"
            onClick={() => {
              setEditTitle(task.title)
              setIsEditing(false)
            }}
          >
            Cancel
          </button>
        </form>
      ) : (
        <>
          <label htmlFor={task.id} className="task-title">
            {task.title}
          </label>

          <span className={`priority ${task.priority || 'medium'}`}>
            {task.priority || 'medium'}
          </span>

          <div className="task-actions">
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              disabled={task.done}
              aria-label={`Edit ${task.title}`}
            >
              Edit
            </button>

            <button
              type="button"
              onClick={handleDelete}
              aria-label={`Delete ${task.title}`}
            >
              ✕
            </button>
          </div>
        </>
      )}
    </li>
  )
}

export default function TaskList({
  tasks,
  onToggle,
  onDelete,
  onEdit
}) {
  if (tasks.length === 0) {
    return (
      <p className="empty">
        No tasks found. Add a new task to get started!
      </p>
    )
  }

  return (
    <ul className="todo-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  )
}
