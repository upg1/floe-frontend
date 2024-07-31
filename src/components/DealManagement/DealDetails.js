// components/DealManagement/DealDetails.js

import React from 'react';

const DealDetails = ({ deal }) => {
  return (
    <div className="p-4 border rounded-md shadow-md bg-white">
      <h3 className="text-xl font-bold mb-2">{deal.title}</h3>
      <p className="text-gray-700 mb-2"><strong>Description:</strong> {deal.description}</p>
      <p className="text-gray-700 mb-2"><strong>Date:</strong> {deal.date}</p>
      <p className="text-gray-700"><strong>Amount:</strong> {deal.amount}</p>
    </div>
  );
};

export default DealDetails;
