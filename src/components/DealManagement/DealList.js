import React from 'react';
import { useRouter } from 'next/navigation'; // Import from next/navigation

const DealList = ({ deals }) => {
  const { push } = useRouter(); // Destructure push from useRouter

  const handleNavigation = (id) => {
    push(`/deal/${id}`); // Use push for navigation
  };

  return (
    <div>
      <h2>Deal List</h2>
      <ul>
        {deals.map(deal => (
          <li key={deal.id}>
            <button onClick={() => handleNavigation(deal.id)}>
              {deal.name}
            </button> - {deal.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DealList;
