import React from 'react';
import DealDetails from '../../../components/DealManagement/DealDetails';

export default async function DealPage({ params }) {
  const { id } = params; // Get the deal ID from the URL
  const deal = await getDealById(id); // Fetch the specific deal

  return (
    <div>
      <h2>Deal Details</h2>
      <DealDetails deal={deal} /> {/* Render deal details */}
    </div>
  );
}
