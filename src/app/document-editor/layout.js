import React, { Suspense } from 'react';

const DocumentLayout = ({ children }) => {
  return (
    <div className="p-4">
      <Suspense fallback={<p>Loading...</p>}>
        {children}
      </Suspense>
    </div>
  );
};

export default DocumentLayout;
