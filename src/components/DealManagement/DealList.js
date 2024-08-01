// components/DealList.js
'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

const DealList = ({ deals }) => {
  const { push } = useRouter();

  const handleNavigation = (id) => {
    push(`/deals/${id}`);
  };

  return (
    <div>
      <h2>Deal List</h2>
      <ul>
        {deals.map(deal => (
          <li key={deal.id}>
            <button onClick={() => handleNavigation(deal.id)} className="text-blue-500 hover:underline">
              {deal.name}
            </button> - {deal.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DealList;
