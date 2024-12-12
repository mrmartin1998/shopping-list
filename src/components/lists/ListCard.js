'use client'

import Link from 'next/link';

export default function ListCard({ list, onDelete }) {
  return (
    <div className="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
      <div className="card-body">
        <div className="flex justify-between items-start">
          <h2 className="card-title text-base-content">{list.name}</h2>
          <button 
            onClick={(e) => {
              e.preventDefault();
              onDelete?.(list.id);
            }}
            className="btn btn-ghost btn-sm text-error"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        <p className="text-sm text-base-content/70">
          {list.items?.length || 0} items
        </p>
        <p className="text-xs text-base-content/50">
          Created: {new Date(list.createdAt).toLocaleDateString()}
        </p>
        <div className="card-actions justify-end mt-4">
          <Link href={`/lists/${list.id}`} className="btn btn-primary btn-sm">
            View List
          </Link>
        </div>
      </div>
    </div>
  );
}
