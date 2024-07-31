import React from 'react';
import './globals.css'; // Global styles
import Dashboard from '../components/Dashboard/Dashboard';
import { Providers } from '../context/Providers'; // Import context provider

export const metadata = {
  title: 'Knowledge Management System',
  description: 'A system for managing M&A deals and legal documents.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="layout">
            <header>
              <h1>Knowledge Management System</h1>
              <nav>
                {/* Add navigation links here */}
                <ul>
                  <li><a href="/">Home</a></li>
                  <li><a href="/document-editor">Document Editor</a></li>
                  <li><a href="/deals">Deals</a></li>
                </ul>
              </nav>
            </header>
            <main>
              <Dashboard /> {/* Optional dashboard or sidebar */}
              {children}
            </main>
            <footer>
              <p>&copy; 2024 Knowledge Management System</p>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
