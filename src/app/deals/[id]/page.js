import React from 'react';
import DealDetails from '../../../components/DealManagement/DealDetails';

// Dummy deal data
const dummyDeals = {
  1: {
    id: 1,
    title: 'Sample Deal Title 1',
    description: 'Description for deal 1.',
    date: '2024-07-31',
    amount: '$100,000',
  },
  2: {
    id: 2,
    title: 'Sample Deal Title 2',
    description: 'Description for deal 2.',
    date: '2024-07-30',
    amount: '$200,000',
  },
  // Add more deals as needed
};

export default function DealPage({ params }) {
  const { id } = params; // Get the deal ID from the URL

  // Use dummy data based on id
  const deal = dummyDeals[id] || dummyDeals[1]; // Default to deal 1 if id is not found

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Deal Details</h2>
      <DealDetails deal={deal} /> {/* Render deal details */}
    </div>
  );
}
