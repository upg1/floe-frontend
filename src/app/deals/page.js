import React from 'react';
import DealDetails from '../../components/DealManagement/DealDetails';

// Dummy deal data
const dummyDeal = {
  id: 1,
  title: 'Sample Deal Title',
  description: 'This is a description for the sample deal.',
  date: '2024-07-31',
  amount: '$100,000',
};

export default function DealListPage({ params }) {
  const { id } = params; // Get the deal ID from the URL

  // In a real app, you would use id to fetch the deal. For now, we use dummy data.
  // You can use the ID to simulate different dummy deals if needed.
  const deal = dummyDeal;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Deal Details</h2>
      <DealDetails deal={deal} /> {/* Render deal details */}
    </div>
  );
}
