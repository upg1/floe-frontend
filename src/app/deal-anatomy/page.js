// app/deal-anatomy/page.js
'use client'

import React from 'react';
import DealDashboard from '@/components/Dashboard/DealDashboard'; // Ensure the path is correct

export default function DealAnatomyPage() {
  return (
    <div className="container mx-auto p-4">
      <DealDashboard />
    </div>
  );
}
