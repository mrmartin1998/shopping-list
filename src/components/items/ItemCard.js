'use client'

export default function ItemCard({ item, onToggle, onEdit, onDelete }) {
  return (
    <div className="card bg-base-100 shadow">
      <div className="card-body p-4">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={item.completed}
            onChange={() => onToggle?.(item.id)}
            className="checkbox checkbox-primary"
          />
          <div className="flex-1">
            <h3 className={`font-medium ${item.completed ? 'line-through opacity-50' : ''}`}>
              {item.name}
            </h3>
            <div className="text-sm opacity-70">
              Quantity: {item.quantity} • {item.category}
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => onEdit?.(item)} className="btn btn-ghost btn-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </button>
            <button onClick={() => onDelete?.(item.id)} className="btn btn-ghost btn-sm text-error">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
