
import { useEffect, useState } from 'react'
import './App.css'

import FilterBar from './components/FilterBar'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'

function App() {
  // Load tasks from LocalStorage
  const [tasks, setTasks] = useState(() => {
    try {
      const savedTasks = localStorage.getItem('my-todo-tasks')
      return savedTasks ? JSON.parse(savedTasks) : []
    } catch {
      return []
    }
  })

  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  // Save tasks whenever they change
  useEffect(() => {
    localStorage.setItem('my-todo-tasks', JSON.stringify(tasks))
  }, [tasks])

  // Add a new task
  const addTask = (title, priority) => {
    const newTask = {
      id: crypto.randomUUID(),
      title: title.trim(),
      done: false,
      priority: priority,
      createdAt: new Date().toISOString()
    }

    setTasks((prevTasks) => [...prevTasks, newTask])
  }

  // Complete or uncomplete a task
  const toggleTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? { ...task, done: !task.done }
          : task
      )
    )
  }

  // Delete a task
  const deleteTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== id)
    )
  }

  // Edit a task
  const editTask = (id, newTitle) => {
    const cleanTitle = newTitle.trim()

    if (!cleanTitle) return

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? { ...task, title: cleanTitle }
          : task
      )
    )
  }

  // Clear completed tasks
  const clearCompleted = () => {
    setTasks((prevTasks) =>
      prevTasks.filter((task) => !task.done)
    )
  }

  // Filter and search tasks
  const visibleTasks = tasks.filter((task) => {
    const matchesFilter =
      filter === 'active'
        ? !task.done
        : filter === 'completed'
          ? task.done
          : true

    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase())

    return matchesFilter && matchesSearch
  })

  // Task statistics
  const totalTasks = tasks.length
  const completedTasks = tasks.filter(
    (task) => task.done
  ).length

  const remainingTasks = totalTasks - completedTasks

  return (
    <main className="todo-container">

      <header className="todo-header">
        <h1>My Task Manager</h1>
        <p>Organize your day, one task at a time.</p>
      </header>

      <section className="todo-content">

        <div className="todo-stats">
          <div>
            <h3>{totalTasks}</h3>
            <p>Total Tasks</p>
          </div>

          <div>
            <h3>{completedTasks}</h3>
            <p>Completed</p>
          </div>

          <div>
            <h3>{remainingTasks}</h3>
            <p>Pending</p>
          </div>
        </div>

        <TaskForm onAdd={addTask} />

        <div className="search-container">
          <input
            type="search"
            placeholder="Search your tasks..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            aria-label="Search tasks"
          />
        </div>

        <FilterBar
          filter={filter}
          onChange={setFilter}
        />

        <TaskList
          tasks={visibleTasks}
          onToggle={toggleTask}
          onDelete={deleteTask}
          onEdit={editTask}
        />

        <footer className="todo-footer">
          <p role="status">
            {remainingTasks} task
            {remainingTasks === 1 ? '' : 's'} left
          </p>

          {completedTasks > 0 && (
            <button
              type="button"
              onClick={clearCompleted}
            >
              Clear completed
            </button>
          )}
        </footer>

      </section>
    </main>
  )
}

export default App
