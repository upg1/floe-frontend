import React from 'react';

const EntityCard = ({ entity }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow hover:bg-gray-50 transition-colors">
      <h3 className="text-lg font-medium">{entity.name}</h3>
      <p className="text-gray-700 mt-2">{entity.details}</p>

      {entity.value ? 
      	<div className="mt-4 text-sm text-gray-500">
          <strong>Value</strong> {entity.value} 
        </div> : null}

      
      {entity.deal && (
        <div className="mt-4 text-sm text-gray-500">
          <strong>Deal/Party:</strong> {entity.deal} 
        </div>
      )}
      
      <div className="mt-2 text-sm text-gray-600">
        <strong>Context:</strong> {entity.context}
      </div>
    </div>
  );
};

export default EntityCard;
