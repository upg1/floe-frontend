'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchDeals, fetchDocuments } from '../lib/api'; // Ensure you have these functions

const GlobalContext = createContext();

export function Providers({ children }) {
  const [globalState, setGlobalState] = useState({
    user: null,
    dealData: [],
    documentData: [], // Updated state for documents
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const deals = await fetchDeals();
        const documents = await fetchDocuments(); // Fetch existing documents
        setGlobalState(prevState => ({
          ...prevState,
          dealData: deals,
          documentData: documents,
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
    <GlobalContext.Provider value={{ globalState, setGlobalState, saveDocument, loading, error }}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  return useContext(GlobalContext);
}
