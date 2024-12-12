'use client'

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ItemCard from '@/components/items/ItemCard';
import ItemModal from '@/components/items/ItemModal';
import { getStoredLists, addItemToList, updateListItem, deleteListItem } from '@/lib/utils/localStorage';

export default function ListDetail() {
  const params = useParams();
  const [list, setList] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    loadList();
  }, [params.id]);

  const loadList = () => {
    const lists = getStoredLists();
    const currentList = lists.find(l => l.id === params.id);
    setList(currentList);
  };

  const handleSaveItem = (itemData) => {
    if (editingItem) {
      updateListItem(params.id, { ...itemData, id: editingItem.id });
    } else {
      addItemToList(params.id, itemData);
    }
    loadList();
  };

  const handleDeleteItem = (itemId) => {
    deleteListItem(params.id, itemId);
    loadList();
  };

  const handleToggleItem = (itemId) => {
    const item = list.items.find(i => i.id === itemId);
    if (item) {
      updateListItem(params.id, { ...item, completed: !item.completed });
      loadList();
    }
  };

  const filteredItems = list?.items?.filter(item => 
    selectedCategory === 'all' || item.category === selectedCategory
  ) || [];

  if (!list) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">{list.name}</h1>
        <button 
          className="btn btn-primary"
          onClick={() => {
            setEditingItem(null);
            setIsModalOpen(true);
          }}
        >
          Add Item
        </button>
      </div>

      <div className="mb-4">
        <select 
          className="select select-bordered"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          {Array.from(new Set(list.items?.map(item => item.category) || []))
            .filter(Boolean)
            .map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
        </select>
      </div>

      <div className="space-y-4">
        {filteredItems.map(item => (
          <ItemCard 
            key={item.id}
            item={item}
            onEdit={(item) => {
              setEditingItem(item);
              setIsModalOpen(true);
            }}
            onDelete={handleDeleteItem}
            onToggle={handleToggleItem}
          />
        ))}
      </div>

      <ItemModal 
        isOpen={isModalOpen}
        item={editingItem}
        onClose={() => {
          setIsModalOpen(false);
          setEditingItem(null);
        }}
        onSave={handleSaveItem}
      />
    </div>
  );
}
