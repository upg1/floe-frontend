import React from 'react';

const DealDetails = ({ deal }) => {
  return (
    <div>
      <h2>Deal Details: {deal.name}</h2>
      <p>Status: {deal.status}</p>
      {/* Add more deal details here */}
    </div>
  );
};

export default DealDetails;
