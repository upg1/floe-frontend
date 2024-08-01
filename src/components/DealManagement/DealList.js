'use client'
import React from 'react';
import { useRouter } from 'next/navigation';

const DealList = ({ deals }) => {
  const { push } = useRouter();

  const handleNavigation = (id) => {
    push(`/deals/${id}`);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Deal List</h2>
      <ul className="space-y-4">
        {deals.map(deal => (
          <li key={deal.id} className="bg-white shadow rounded-lg p-4 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">{deal.name}</h3>
              <p className={`text-sm ${deal.status === 'Active' ? 'text-green-500' : 'text-yellow-500'}`}>
                {deal.status}
              </p>
            </div>
            <button
              onClick={() => handleNavigation(deal.id)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              View Details
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DealList;
