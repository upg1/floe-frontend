import React from 'react';

const ClauseLibrarySidebar = ({ clauses, onSelectClause }) => {
  return (
    <div className="drawer">
      <h3>Clause Library</h3>
      <ul>
        {clauses.map(clause => (
          <li key={clause.id} onClick={() => onSelectClause(clause)}>
            {clause.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClauseLibrarySidebar;
