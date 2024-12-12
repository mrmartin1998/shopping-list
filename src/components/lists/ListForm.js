'use client'

import { useState } from 'react';

export default function ListForm({ onSubmit, initialData = null }) {
  const [name, setName] = useState(initialData?.name || '');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError('List name is required');
      return;
    }

    onSubmit({
      id: initialData?.id || Date.now().toString(),
      name: name.trim(),
      items: initialData?.items || []
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="form-control">
        <label className="label">
          <span className="label-text">List Name</span>
        </label>
        <input
          type="text"
          placeholder="Enter list name"
          className={`input input-bordered w-full ${error ? 'input-error' : ''}`}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError('');
          }}
        />
        {error && (
          <label className="label">
            <span className="label-text-alt text-error">{error}</span>
          </label>
        )}
      </div>
      
      <div className="flex justify-end gap-2">
        <button type="submit" className="btn btn-primary">
          {initialData ? 'Update List' : 'Create List'}
        </button>
      </div>
    </form>
  );
}
