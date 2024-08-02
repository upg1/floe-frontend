// lib/api.js

export const fetchDeals = async () => {
  // Mocked fetch call for deals
  return [
    { id: 1, name: 'Deal 1', status: 'Active' },
    { id: 2, name: 'Deal 2', status: 'Pending' },
  ];
};

export const fetchDocuments = async () => {
  // Mocked fetch call for documents
  return [
    { id: 1, title: 'Document 1', content: 'Content of Document 1' },
    { id: 2, title: 'Document 2', content: 'Content of Document 2' },
    { id: 3, title: 'Document 3', content: 'Content of Document 3' },
  ];
};



export async function fetchClauses() {
  // Simulate an API call with dummy data
  return [
    { id: 1, title: 'Purchase Price and Payment Terms', text: 'The purchase price for the acquisition of the Company shall be [Purchase Price], payable as follows: [Payment Terms]. The Purchase Price shall be subject to adjustments based on the final audited financial statements of the Company.' },
    { id: 2, title: 'Representations and Warranties', text: 'The Seller represents and warrants that: (i) the Company is in compliance with all applicable laws and regulations; (ii) all financial statements provided are true and correct in all material respects; (iii) there are no undisclosed liabilities or obligations that could materially affect the value of the Company.' },
    { id: 3, title: 'Indemnification', text: 'The Seller agrees to indemnify and hold harmless the Buyer, its affiliates, and their respective officers, directors, and employees from and against any and all losses, claims, damages, liabilities, or expenses arising out of or related to (i) any breach of the Seller\'s representations and warranties; or (ii) any liabilities not disclosed in the financial statements.' },
    { id: 4, title: 'Confidentiality and Non-Compete', text: 'The Seller agrees to keep all confidential information pertaining to the Company and the transaction confidential and shall not disclose such information to any third party without the prior written consent of the Buyer. Furthermore, for a period of [Non-Compete Period] following the Closing Date, the Seller shall not engage in or participate in any business that competes with the Company.' },
    { id: 5, title: 'Conditions Precedent', text: 'The obligations of the Buyer to consummate the acquisition are subject to the fulfillment of the following conditions: (i) the completion of a satisfactory due diligence review of the Company; (ii) the receipt of all required regulatory approvals; (iii) the execution and delivery of all transaction documents; and (iv) the absence of any material adverse change in the Company\'s business, operations, or financial condition.' },
  ];
}

// lib/api.js

export async function fetchRegulations(searchTerm) {
  const allRegulations = [
    { id: 1, title: 'Regulation on Confidentiality', text: 'Companies must ensure the confidentiality of sensitive business information and prevent unauthorized disclosure to third parties.', keywords: ['confidential'] },
    { id: 2, title: 'Regulation on Non-Compete Agreements', text: 'Employees must not engage in competitive activities for a specified period following their departure from the company.', keywords: ['non-compete'] },
    { id: 3, title: 'Regulation on Financial Disclosures', text: 'Companies are required to provide accurate financial statements and disclose any material liabilities or financial risks.', keywords: ['financial'] },
    { id: 4, title: 'Regulation on Indemnification', text: 'Companies must indemnify their officers and directors against certain liabilities incurred while performing their duties.', keywords: ['indemnification'] },
    { id: 5, title: 'Regulation on Data Protection', text: 'Organizations must implement measures to protect personal data and comply with relevant data protection laws.', keywords: ['data protection'] },
  ];

  // Convert search term to lowercase and split into words
  const lowerCaseSearchTerm = searchTerm.toLowerCase();
  const searchWords = lowerCaseSearchTerm.split(/\s+/);

  return allRegulations.filter(regulation =>
    regulation.keywords.some(keyword =>
      searchWords.includes(keyword.toLowerCase())
    )
  );
}

// lib/api.js

export const fetchEntities = async () => {
  // Simulated data for different deal dimensions
  return {
    assets: [
      { id: 1, name: 'Brand X', value: '$1M', deal: 'Deal 1', context: 'Major brand in consumer electronics.' },
      { id: 2, name: 'Patents Y', value: '$500K', deal: 'Deal 2', context: 'Key patents in renewable energy.' }
    ],
    liabilities: [
      { id: 1, description: 'Loan from Bank A', amount: '$200K', deal: 'Deal 1', context: 'Outstanding loan with a 5% interest rate.' },
      { id: 2, description: 'Pending litigation', amount: '$100K', deal: 'Deal 2', context: 'Ongoing legal case that may impact valuation.' }
    ],
    covenants: [
      { id: 1, name: 'Non-Compete Clause', details: 'Restrictions on competing businesses post-acquisition.', deal: 'Deal 1', context: 'Prevents competition in the same market segment.' },
      { id: 2, name: 'Confidentiality Agreement', details: 'Obligations to maintain confidentiality of sensitive information.', deal: 'Deal 2', context: 'Ensures non-disclosure of trade secrets and sensitive data.' }
    ],
    regulations: [
      { id: 1, name: 'Data Protection Regulation', text: 'Companies must implement measures to protect personal data.', deal: 'Deal 1', context: 'Compliance with GDPR and local data protection laws.' },
      { id: 2, name: 'Financial Disclosure Regulation', text: 'Companies must provide accurate financial statements.', deal: 'Deal 2', context: 'Ensures transparency in financial reporting.' }
    ]
  };
};


