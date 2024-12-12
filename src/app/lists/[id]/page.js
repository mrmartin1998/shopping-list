'use client'

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ItemCard from '@/components/items/ItemCard';
import ItemModal from '@/components/items/ItemModal';
import { getStoredLists } from '@/lib/utils/localStorage';

export default function ListDetail() {
  const params = useParams();
  const [list, setList] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    const lists = getStoredLists();
    const currentList = lists.find(l => l.id === params.id);
    setList(currentList);
  }, [params.id]);

  if (!list) {
    return <div>Loading...</div>;
  }

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

      <div className="space-y-4">
        {list.items?.map(item => (
          <ItemCard 
            key={item.id}
            item={item}
            onEdit={(item) => {
              setEditingItem(item);
              setIsModalOpen(true);
            }}
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
      />
    </div>
  );
}
