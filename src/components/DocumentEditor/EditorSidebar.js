import React from 'react';

const EditorSidebar = ({ documents, onSelectDocument }) => {
  return (
    <div className="sidebar">
      <h2>Documents</h2>
      <ul className="document-list">
        {documents.map(doc => (
          <li key={doc.id} className="document-item">
            <button 
              className="document-button" 
              onClick={() => onSelectDocument(doc)}
            >
              {doc.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EditorSidebar;
