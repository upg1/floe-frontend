'use client';

import React, { useState, useEffect } from 'react';
import DealList from '../components/DealManagement/DealList';
import { useGlobalContext } from '../context/Providers';

export default function HomePage() {
  const { globalState, setGlobalState } = useGlobalContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Use dummy data for now
    const fetchDeals = async () => {
      try {
        const dummyDeals = [
          { id: 1, name: 'Deal 1', status: 'Active' },
          { id: 2, name: 'Deal 2', status: 'Pending' },
        ];

        setGlobalState(prevState => ({ ...prevState, dealData: dummyDeals }));
      } catch (error) {
        console.error('Error fetching deals:', error);
        setError('Failed to load deals');
      } finally {
        setLoading(false);
      }
    };

    fetchDeals();
  }, [setGlobalState]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-lg font-semibold">Loading deals...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-lg font-semibold text-red-500">Error loading deals: {error}</div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-4">
      <DealList deals={globalState.dealData} />
    </div>
  );
}
