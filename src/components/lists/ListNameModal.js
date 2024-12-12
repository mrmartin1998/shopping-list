'use client'

import { useState } from 'react';

export default function ListNameModal({ isOpen, list, onClose, onSave }) {
  const [name, setName] = useState(list?.name || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onSave({ ...list, name: name.trim() });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <dialog className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">Rename List</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input input-bordered w-full"
            placeholder="List name"
            autoFocus
          />
          <div className="modal-action">
            <button type="button" className="btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </div>
        </form>
      </div>
      <div className="modal-backdrop" onClick={onClose}>
        <button className="cursor-default">close</button>
      </div>
    </dialog>
  );
} 