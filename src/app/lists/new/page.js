'use client'

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ListForm from '@/components/lists/ListForm';
import { addStoredList } from '@/lib/utils/localStorage';

export default function NewList() {
  const router = useRouter();

  const handleSubmit = (listData) => {
    try {
      addStoredList(listData);
      router.push('/lists');
    } catch (error) {
      console.error('Error creating list:', error);
      // We'll add toast notifications later
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Create New List</h1>
        <Link href="/lists" className="btn btn-ghost">
          Cancel
        </Link>
      </div>

      <div className="card bg-base-200">
        <div className="card-body">
          <ListForm onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
}
