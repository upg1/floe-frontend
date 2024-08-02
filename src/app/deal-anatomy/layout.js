// app/deal-anatomy/layout.js
import React from 'react';

export default function DealAnatomyLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 p-4">
        {children}
      </main>
    </div>
  );
}
