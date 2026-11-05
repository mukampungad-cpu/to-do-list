export default function FilterBar({filter, onChange}) {
    const FILTERS = ['all', 'active', 'done']
    return (
        <div role="group" aria-label="Filter Tasks" className="filters">
            {FILTERS.map((f) => {
            <button key={f} type="button" aria-pressed={filter === f} onClick={() => onChange(f)}>
          {f[0].toUpperCase() + f.slice(1)}
        </button>

            })}
        </div>
    )
}