import React from 'react';
import DealList from '../../components/DealManagement/DealList';

const deals = [
  { id: 1, name: 'Deal 1', status: 'Active' },
  { id: 2, name: 'Deal 2', status: 'Pending' },
];

const DealPage = () => {
  return <DealList deals={deals} />;
};

export default DealPage;
