'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ListCard from '@/components/lists/ListCard';
import { getStoredLists } from '@/lib/utils/localStorage';

export default function Lists() {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    try {
      const storedLists = getStoredLists() || [];
      setLists(storedLists);
    } catch (error) {
      console.error('Error loading lists:', error);
      setLists([]);
    }
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">All Shopping Lists</h1>
        <Link href="/lists/new" className="btn btn-primary">
          Create New List
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.isArray(lists) && lists.map(list => (
          <ListCard 
            key={list.id} 
            list={list}
            onDelete={(id) => {
              // We'll implement this later
              console.log('Delete list:', id);
            }}
          />
        ))}
      </div>

      {(!lists || lists.length === 0) && (
        <div className="text-center py-12">
          <h3 className="text-xl mb-2">No shopping lists found</h3>
          <p className="text-base-content/70 mb-4">
            Create your first list to get started
          </p>
          <Link href="/lists/new" className="btn btn-primary">
            Create List
          </Link>
        </div>
      )}
    </div>
  );
}
