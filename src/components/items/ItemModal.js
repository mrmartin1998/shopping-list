'use client'

import { useState, useEffect } from 'react';
import CategoryManager from '@/components/categories/CategoryManager';

export default function ItemModal({ isOpen, item, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    quantity: 1,
    priority: 'normal',
    price: '',
    notes: '',
    completed: false
  });

  useEffect(() => {
    if (item) {
      setFormData(item);
    } else {
      setFormData({
        name: '',
        category: '',
        quantity: 1,
        priority: 'normal',
        price: '',
        notes: '',
        completed: false
      });
    }
  }, [item]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave?.(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">
          {item ? 'Edit Item' : 'Add New Item'}
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Item Name</span>
            </label>
            <input
              type="text"
              className="input input-bordered"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                name: e.target.value
              }))}
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Category</span>
            </label>
            <CategoryManager 
              onSelect={(category) => {
                setFormData(prev => ({
                  ...prev,
                  category: category.name
                }));
              }}
              selectedCategory={formData.category}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Quantity</span>
            </label>
            <input
              type="number"
              className="input input-bordered"
              value={formData.quantity}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                quantity: parseInt(e.target.value) || 1
              }))}
              min="1"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Priority</span>
            </label>
            <select
              className="select select-bordered"
              value={formData.priority}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                priority: e.target.value
              }))}
            >
              <option value="low">Low</option>
              <option value="normal">Normal</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Price (optional)</span>
            </label>
            <input
              type="number"
              step="0.01"
              className="input input-bordered"
              value={formData.price}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                price: e.target.value
              }))}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Notes (optional)</span>
            </label>
            <textarea
              className="textarea textarea-bordered"
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                notes: e.target.value
              }))}
            />
          </div>

          <div className="modal-action">
            <button type="button" className="btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {item ? 'Update' : 'Add'} Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
