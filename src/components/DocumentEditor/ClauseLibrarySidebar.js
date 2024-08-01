'use client';
import React from 'react';
import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/20/solid';

const ClauseLibrarySidebar = ({ clauses, onSelectClause }) => {
  return (
    <div className="w-64 bg-gray-200 p-4">
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-gray-900 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
              <span>Clause Library</span>
              <ChevronUpIcon
                className={`${open ? 'transform rotate-180' : ''} w-5 h-5 text-gray-500`}
              />
            </Disclosure.Button>
            <Disclosure.Panel className="pt-4 pb-2 text-sm text-gray-500">
              {clauses.map(clause => (
                <button
                  key={clause.id}
                  onClick={() => onSelectClause(clause)}
                  className="block w-full px-4 py-2 mt-2 text-left text-sm text-blue-700 bg-blue-100 rounded-md hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Insert {clause.title}
                </button>
              ))}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default ClauseLibrarySidebar;
