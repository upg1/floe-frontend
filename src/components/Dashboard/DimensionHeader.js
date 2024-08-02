import React from 'react';
import EntityCard from './EntityCard'; // Import the updated EntityCard

const DimensionHeader = ({ dimension }) => (
  <div className="bg-gray-100 p-4 rounded-lg shadow mb-4">
    <h2 className="text-xl font-semibold">{dimension.title}</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {dimension.entities.map(entity => (
        <EntityCard key={entity.id} entity={entity} />
      ))}
    </div>
  </div>
);

export default DimensionHeader;
