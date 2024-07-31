'use client'
import React, { useEffect, useState } from 'react';
import DraftEditor from '../../components/DocumentEditor/DraftEditor';
import ClauseLibrarySidebar from '../../components/DocumentEditor/ClauseLibrarySidebar';
import { useGlobalContext } from '../../context/Providers'; // Import context hook

export default function DocumentEditorPage() {
  const { globalState, setGlobalState } = useGlobalContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Use dummy data for testing
    const fetchClauses = async () => {
      try {
        const dummyClauses = [
          { id: 1, title: 'Governing Law', text: 'This agreement shall be governed by the laws of [State].' },
          { id: 2, title: 'Indemnification', text: 'The Seller agrees to indemnify the Buyer against any losses arising from breach of warranties.' },
          { id: 3, title: 'Confidentiality', text: 'Both parties agree to keep the terms of this agreement confidential.' },
        ];

        setGlobalState(prevState => ({ ...prevState, clauseData: dummyClauses }));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching clauses:', error);
        setError('Failed to load clauses');
        setLoading(false);
      }
    };

    fetchClauses();
  }, [setGlobalState]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="document-editor-page">
      <ClauseLibrarySidebar
        clauses={globalState.clauseData}
        onSelectClause={(clause) => console.log(clause)}
      />
      <DraftEditor clauses={globalState.clauseData} />
    </div>
  );
}
