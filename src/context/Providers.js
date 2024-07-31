'use client'
import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a Context for the global state
const GlobalContext = createContext();

// Create a provider component
export function Providers({ children }) {
  const [globalState, setGlobalState] = useState({
    user: null,
    dealData: [],
    // Add other global states as needed
  });

  // Example effect to fetch initial data
  useEffect(() => {
    async function fetchData() {
      // Fetch global data if needed
    }
    fetchData();
  }, []);

  return (
    <GlobalContext.Provider value={{ globalState, setGlobalState }}>
      {children}
    </GlobalContext.Provider>
  );
}

// Custom hook to use the global state
export function useGlobalContext() {
  return useContext(GlobalContext);
}
