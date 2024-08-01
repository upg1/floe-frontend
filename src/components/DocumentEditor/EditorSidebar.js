import React from 'react';

const EditorSidebar = ({ documents, onSelectDocument }) => {
  return (
    <div className="sidebar">
      <h2>Documents</h2>
      <div className="document-list">
        {documents.map(doc => (
          <button
            key={doc.id}
            onClick={() => onSelectDocument(doc)}
            className="document-button"
          >
            {doc.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EditorSidebar;
