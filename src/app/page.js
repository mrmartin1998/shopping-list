'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ListCard from '@/components/lists/ListCard';
import { getStoredLists } from '@/lib/utils/localStorage';

export default function Home() {
  const [lists, setLists] = useState([]);
  const [recentLists, setRecentLists] = useState([]);

  useEffect(() => {
    try {
      const storedLists = getStoredLists() || [];
      setLists(storedLists);
      // Get 3 most recent lists
      setRecentLists(storedLists.slice(0, 3));
    } catch (error) {
      console.error('Error loading lists:', error);
      setLists([]);
      setRecentLists([]);
    }
  }, []);

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-base-200 rounded-box p-8">
        <h1 className="text-3xl font-bold mb-4">Welcome to Shopping List</h1>
        <p className="text-base-content/70 mb-6">
          Organize your shopping efficiently. Create lists, manage items, and never forget what you need to buy.
        </p>
        <Link href="/lists/new" className="btn btn-primary">
          Create New List
        </Link>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="stat bg-base-200 rounded-box">
          <div className="stat-title">Total Lists</div>
          <div className="stat-value">{lists?.length || 0}</div>
        </div>
        <div className="stat bg-base-200 rounded-box">
          <div className="stat-title">Active Items</div>
          <div className="stat-value">
            {lists?.reduce((acc, list) => acc + (list.items?.filter(item => !item.completed).length || 0), 0) || 0}
          </div>
        </div>
        <div className="stat bg-base-200 rounded-box">
          <div className="stat-title">Completed Items</div>
          <div className="stat-value">
            {lists?.reduce((acc, list) => acc + (list.items?.filter(item => item.completed).length || 0), 0) || 0}
          </div>
        </div>
      </div>

      {/* Recent Lists */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Recent Lists</h2>
          <Link href="/lists" className="btn btn-ghost">
            View All Lists →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentLists?.map(list => (
            <ListCard 
              key={list.id} 
              list={list}
              onDelete={(id) => {
                // We'll implement this later
                console.log('Delete list:', id);
              }}
            />
          ))}
          {(!recentLists || recentLists.length === 0) && (
            <div className="col-span-3 text-center py-12 bg-base-200 rounded-box">
              <h3 className="text-xl mb-2">No lists yet</h3>
              <p className="text-base-content/70 mb-4">
                Create your first shopping list to get started
              </p>
              <Link href="/lists/new" className="btn btn-primary">
                Create List
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
