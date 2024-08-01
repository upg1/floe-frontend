'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchDeals, fetchDocuments, fetchClauses, fetchRegulations } from '../lib/api'; // Ensure you have these functions

const GlobalContext = createContext();

export function Providers({ children }) {
  const [globalState, setGlobalState] = useState({
    user: null,
    dealData: [],
    documentData: [],
    clauses: [],
    regulations: [], // Added state for regulations
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const deals = await fetchDeals();
        const documents = await fetchDocuments(); // Fetch existing documents
        const clauses = await fetchClauses(); // Fetch clauses
        setGlobalState(prevState => ({
          ...prevState,
          dealData: deals,
          documentData: documents,
          clauses: clauses,
        }));
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const fetchRelevantRegulations = async (searchTerm) => {
    try {
      const regulations = await fetchRegulations(searchTerm);
      setGlobalState(prevState => ({
        ...prevState,
        regulations: regulations, // Set fetched regulations in state
      }));
    } catch (err) {
      console.error('Error fetching regulations:', err);
      setError('Failed to load regulations');
    }
  };

  const saveDocument = (updatedDocument) => {
    setGlobalState(prevState => {
      const updatedDocumentId = String(updatedDocument.id); // Convert to string

      // Find the index of the document to update
      const index = prevState.documentData.findIndex(doc => String(doc.id) === updatedDocumentId);

      if (index === -1) {
        console.warn('Document with ID not found, skipping update.');
        return prevState; // Skip update if document not found
      } else {
        // Update existing document with preserved title and other metadata
        const existingDocument = prevState.documentData[index];
        const newDocumentData = [...prevState.documentData];
        newDocumentData[index] = {
          ...existingDocument, // Preserve existing metadata
          content: updatedDocument.content // Update only the content
        };
        return {
          ...prevState,
          documentData: newDocumentData
        };
      }
    });
  };

  return (
    <GlobalContext.Provider value={{ 
      globalState, 
      setGlobalState, 
      saveDocument, 
      fetchRelevantRegulations, 
      loading, 
      error 
    }}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  return useContext(GlobalContext);
}
