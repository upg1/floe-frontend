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
