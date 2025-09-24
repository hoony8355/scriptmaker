import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Define the type for the global variable for type safety
declare global {
  interface Window {
    pptx2json: any;
    JSZip: any;
  }
}

const startApp = () => {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    throw new Error("Could not find root element to mount to");
  }

  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

// Function to check if the library is loaded and start the app
const checkLibraryAndStart = () => {
  // The pptx2json library and its dependency JSZip attach themselves to the window object.
  // We check for them after the DOM is loaded.
  if (typeof window.pptx2json !== 'undefined' && typeof window.JSZip !== 'undefined') {
    console.log('pptx2json and JSZip libraries found. Starting the application.');
    startApp();
  } else {
    // If not found, it's a fatal error because all synchronous scripts should have loaded.
    console.error('FATAL: A required library (pptx2json or JSZip) failed to load.');
    const rootElement = document.getElementById('root');
    if (rootElement) {
        let errorMessage = '<h2>An error occurred while loading the application.</h2>';
        if (typeof window.JSZip === 'undefined') {
            errorMessage += '<p>The dependency library JSZip could not be loaded.</p>';
        }
        if (typeof window.pptx2json === 'undefined') {
            errorMessage += '<p>The library for parsing presentations (pptx2json) could not be loaded.</p>';
        }
        errorMessage += '<p>Please check your internet connection and try refreshing the page.</p>';
        rootElement.innerHTML = `<div style="font-family: sans-serif; color: #fca5a5; background-color: #7f1d1d; border: 1px solid #dc2626; padding: 2rem; margin: 2rem; border-radius: 0.5rem;">${errorMessage}</div>`;
    }
  }
};

// Wait until the initial HTML document has been completely loaded and parsed.
// All synchronous <script> tags are guaranteed to have been executed at this point.
document.addEventListener('DOMContentLoaded', checkLibraryAndStart);
