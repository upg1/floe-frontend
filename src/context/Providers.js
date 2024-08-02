// context/Providers.js
'use client'
import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchDeals, fetchDocuments, fetchClauses, fetchRegulations, fetchEntities } from '../lib/api';

const GlobalContext = createContext();

export function Providers({ children }) {
  const [globalState, setGlobalState] = useState({
    user: null,
    dealData: [],
    documentData: [],
    clauses: [],
    regulations: [],
    entities: { assets: [], liabilities: [], covenants: [], regulations: [] } // Ensure this matches your data structure
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const deals = await fetchDeals();
        const documents = await fetchDocuments();
        const clauses = await fetchClauses();
        const entities = await fetchEntities(); // Ensure fetchEntities is available
        setGlobalState(prevState => ({
          ...prevState,
          dealData: deals,
          documentData: documents,
          clauses: clauses,
          entities: entities // Update state with entities
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
        regulations: regulations
      }));
    } catch (err) {
      console.error('Error fetching regulations:', err);
      setError('Failed to load regulations');
    }
  };

  const saveDocument = (updatedDocument) => {
    setGlobalState(prevState => {
      const updatedDocumentId = String(updatedDocument.id);

      const index = prevState.documentData.findIndex(doc => String(doc.id) === updatedDocumentId);

      if (index === -1) {
        console.warn('Document with ID not found, skipping update.');
        return prevState;
      } else {
        const existingDocument = prevState.documentData[index];
        const newDocumentData = [...prevState.documentData];
        newDocumentData[index] = {
          ...existingDocument,
          content: updatedDocument.content
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
