'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'; // Importing icons for the mobile menu

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev);
  };

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-xl font-bold">Floe</h1>
        <nav className="hidden md:flex space-x-4">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/document-editor" className="hover:underline">Document Editor</Link>
          <Link href="/deals" className="hover:underline">Deals</Link>
        </nav>
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMobileMenu}
            className="text-white focus:outline-none"
          >
            {mobileMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
      <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        <Menu as="div" className="bg-gray-800 text-white p-4">
          <Menu.Items className="flex flex-col space-y-2">
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/"
                  className={`block px-4 py-2 text-sm ${active ? 'bg-gray-900' : ''}`}
                >
                  Home
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/document-editor"
                  className={`block px-4 py-2 text-sm ${active ? 'bg-gray-900' : ''}`}
                >
                  Document Editor
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/deals"
                  className={`block px-4 py-2 text-sm ${active ? 'bg-gray-900' : ''}`}
                >
                  Deals
                </Link>
              )}
            </Menu.Item>
          </Menu.Items>
        </Menu>
      </div>
    </header>
  );
};

export default Navbar;
