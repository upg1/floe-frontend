import React from 'react';
import { Providers } from '../context/Providers'; // Import context provider
import Navbar from '../components/Navbar'; // Import the Navbar component
import './globals.css'

export const metadata = {
  title: 'Floe',
  description: 'A system for managing M&A deals and legal documents.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Navbar /> {/* Add the Navbar component here */}
            <main className="flex-1 p-4">
              {children}
            </main>
            <footer className="bg-gray-800 text-white p-4 text-center">
              <p>&copy; 2024 Knowledge Management System</p>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
