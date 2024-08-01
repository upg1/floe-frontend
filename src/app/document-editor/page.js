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
    // Use realistic data for M&A deal clauses
    const fetchClauses = async () => {
      try {
        const dummyClauses = [
          {
            id: 1,
            title: 'Governing Law',
            text: 'This Agreement shall be governed by and construed in accordance with the laws of the State of Delaware, without regard to its conflict of laws principles.'
          },
          {
            id: 2,
            title: 'Indemnification',
            text: 'The Seller agrees to indemnify and hold harmless the Buyer and its affiliates, officers, directors, employees, and agents from and against any and all losses, damages, liabilities, costs, or expenses arising out of or resulting from any breach of any representation, warranty, or covenant made by the Seller in this Agreement.'
          },
          {
            id: 3,
            title: 'Confidentiality',
            text: 'Both parties agree to keep the terms of this Agreement, including the purchase price and other financial terms, confidential and not to disclose such information to any third party without the prior written consent of the other party, except as required by law.'
          },
          {
            id: 4,
            title: 'Non-Compete',
            text: 'For a period of three (3) years following the Closing Date, the Seller shall not, directly or indirectly, engage in, or assist any other person or entity in engaging in, any business that competes with the business of the Buyer within the United States.'
          },
          {
            id: 5,
            title: 'Intellectual Property',
            text: 'The Seller represents and warrants that it owns or has the right to use all intellectual property rights necessary for the operation of the business as currently conducted. Upon closing, all such intellectual property rights shall be transferred to the Buyer.'
          },
          {
            id: 6,
            title: 'Employment Agreements',
            text: 'The Buyer shall offer employment to certain key employees of the Seller, on terms and conditions to be mutually agreed upon, effective as of the Closing Date.'
          },
          {
            id: 7,
            title: 'Purchase Price Adjustment',
            text: 'The purchase price set forth in this Agreement is subject to adjustment based on the final closing balance sheet of the Seller, which shall be prepared in accordance with GAAP and delivered to the Buyer within 60 days following the Closing Date.'
          },
          {
            id: 8,
            title: 'Closing Conditions',
            text: 'The obligations of the parties to consummate the transactions contemplated by this Agreement are subject to the satisfaction or waiver of the following conditions: (i) receipt of all required regulatory approvals, (ii) absence of any material adverse effect, and (iii) accuracy of representations and warranties.'
          },
          {
            id: 9,
            title: 'Representations and Warranties',
            text: 'Each party represents and warrants to the other party that: (i) it has the requisite power and authority to enter into and perform this Agreement, (ii) this Agreement has been duly executed and delivered, and (iii) the execution and delivery of this Agreement does not violate any applicable laws or result in a breach of any agreement to which it is a party.'
          },
          {
            id: 10,
            title: 'Termination',
            text: 'This Agreement may be terminated by either party if the closing has not occurred on or before [Date], or if any governmental authority has issued an order, decree, or ruling, or taken any other action permanently enjoining or otherwise prohibiting the transactions contemplated by this Agreement.'
          }
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
    <div className="document-editor-page flex">
      <ClauseLibrarySidebar
        clauses={globalState.clauseData}
        onSelectClause={(clause) => console.log(clause)}
      />
      <div className="flex-1 p-4">
        <DraftEditor clauses={globalState.clauseData} />
      </div>
    </div>
  );
}
