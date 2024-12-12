'use client'

import Link from 'next/link';

export default function Home() {
  // Temporary mock data for testing
  const mockLists = [
    { id: '1', name: 'Grocery List', createdAt: new Date(), itemCount: 5 },
    { id: '2', name: 'Hardware Store', createdAt: new Date(), itemCount: 3 },
    { id: '3', name: 'Birthday Shopping', createdAt: new Date(), itemCount: 8 },
  ];

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">My Shopping Lists</h1>
        <button className="btn btn-primary">New List</button>
      </div>

      {/* Lists Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockLists.map((list) => (
          <Link href={`/lists/${list.id}`} key={list.id}>
            <div className="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow cursor-pointer">
              <div className="card-body">
                <h2 className="card-title text-base-content">{list.name}</h2>
                <p className="text-sm text-base-content/70">
                  {list.itemCount} items
                </p>
                <p className="text-xs text-base-content/50">
                  Created: {new Date(list.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Empty State */}
      {mockLists.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl mb-2">No shopping lists yet</h3>
          <p className="text-sm text-base-content/70 mb-4">
            Create your first shopping list to get started
          </p>
          <button className="btn btn-primary">Create List</button>
        </div>
      )}
    </div>
  );
}
