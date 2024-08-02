import React from 'react';
import { useGlobalContext } from '../../context/Providers';
import DimensionHeader from './DimensionHeader';

const DealDashboard = () => {
  const { globalState } = useGlobalContext();
  const { entities } = globalState;

  // Ensure entities and its properties are defined before trying to map
  const assets = entities?.assets || [];
  const liabilities = entities?.liabilities || [];
  const covenants = entities?.covenants || [];
  const regulations = entities?.regulations || [];

  // Organize dimensions for easier mapping
  const dimensions = [
    { title: 'Assets', entities: assets },
    { title: 'Liabilities', entities: liabilities },
    { title: 'Covenants', entities: covenants },
    { title: 'Regulations', entities: regulations }
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Deal Anatomy Dashboard</h1>
      {dimensions.map((dimension, index) => (
        <DimensionHeader
          key={index}
          dimension={{ title: dimension.title, entities: dimension.entities }}
        />
      ))}
    </div>
  );
};

export default DealDashboard;
