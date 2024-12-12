'use client'

import { useState, useEffect } from 'react';

const DEFAULT_CATEGORIES = [
  { id: '1', name: 'Produce', isCustom: false },
  { id: '2', name: 'Dairy', isCustom: false },
  { id: '3', name: 'Meat', isCustom: false },
  { id: '4', name: 'Pantry', isCustom: false },
  { id: '5', name: 'Beverages', isCustom: false },
  { id: '6', name: 'Household', isCustom: false }
];

export default function CategoryManager({ onSelect, selectedCategory = null }) {
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);
  const [newCategory, setNewCategory] = useState('');

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!newCategory.trim()) return;

    const category = {
      id: Date.now().toString(),
      name: newCategory.trim(),
      isCustom: true
    };

    setCategories([...categories, category]);
    setNewCategory('');
  };

  const handleDeleteCategory = (id) => {
    setCategories(categories.filter(c => !c.isCustom || c.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="New category name"
          className="input input-bordered flex-1"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button 
          type="button" 
          className="btn btn-primary"
          onClick={handleAddCategory}
        >
          Add
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {categories.map(category => (
          <div 
            key={category.id}
            className={`flex justify-between items-center p-2 rounded-lg cursor-pointer hover:bg-base-300
              ${selectedCategory === category.name 
                ? 'bg-primary text-primary-content hover:bg-primary' 
                : 'bg-base-200'}`}
            onClick={() => onSelect?.(category)}
          >
            <span className="flex-1">
              {category.name}
            </span>
            {category.isCustom && (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteCategory(category.id);
                }}
                className="btn btn-ghost btn-xs text-error"
              >
                ×
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 