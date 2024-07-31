'use client'
import React, { useEffect, useState } from 'react';
import DealList from '../components/DealManagement/DealList';
import { useGlobalContext } from '../context/Providers'; // Import context hook




export default function HomePage() {
  const { globalState, setGlobalState } = useGlobalContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate fetching data and updating global state
    const fetchDeals = async () => {
      try {
        // Simulate an API call or data fetch with dummy data
        const response = await fetch('/api/deals'); // Adjust URL as needed
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const deals = await response.json();

        setGlobalState(prevState => ({ ...prevState, dealData: deals }));
      } catch (error) {
        console.error('Error fetching deals:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDeals();
  }, [setGlobalState]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading deals: {error}</div>;
  }

  if (!globalState.dealData || globalState.dealData.length === 0) {
    return <div>No deals available.</div>;
  }

  return (
    <div>
      <h2>Home Page</h2>
      <DealList deals={globalState.dealData} /> {/* Render the list of deals from global state */}
    </div>
  );
}
