import React from 'react';

const ComplianceChecker = ({ issues }) => {
  return (
    <div>
      <h3>Compliance Checker</h3>
      {issues.length > 0 ? (
        <ul>
          {issues.map((issue, index) => (
            <li key={index}>{issue}</li>
          ))}
        </ul>
      ) : (
        <p>No compliance issues detected.</p>
      )}
    </div>
  );
};

export default ComplianceChecker;
