'use client'

import { useRouter } from 'next/navigation';

export default function ListCard({ list }) {
  const router = useRouter();

  return (
    <div 
      className="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow cursor-pointer" 
      onClick={() => router.push(`/lists/${list.id}`)}
    >
      <div className="card-body">
        <div className="flex justify-center items-center">
          <h2 className="card-title text-base-content text-center">{list.name}</h2>
        </div>
        <p className="text-sm text-base-content/70 text-center">
          {list.items?.length || 0} items
        </p>
        
      </div>
    </div>
  );
}
