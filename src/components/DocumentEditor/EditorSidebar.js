import React from 'react';

const EditorSidebar = ({ documents, onSelectDocument }) => {
  return (
    <div className="sidebar bg-gray-50 p-4 border-r border-gray-200">
      <h2 className="text-xl font-bold mb-4">Documents</h2>
      <div className="document-list space-y-2">
        {documents.map(doc => (
          <button
            key={doc.id}
            onClick={() => onSelectDocument(doc)}
            className="document-button w-full text-left px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors duration-150"
          >
            {doc.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EditorSidebar;
