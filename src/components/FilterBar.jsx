
export default function FilterBar({ filter, onChange }) {
  const filters = [
    { label: 'All Tasks', value: 'all' },
    { label: 'Pending', value: 'active' },
    { label: 'Completed', value: 'completed' }
  ]

  return (
    <div className="filter-bar" aria-label="Filter tasks">
      {filters.map((item) => (
        <button
          key={item.value}
          type="button"
          className={filter === item.value ? 'active-filter' : ''}
          onClick={() => onChange(item.value)}
          aria-pressed={filter === item.value}
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}
