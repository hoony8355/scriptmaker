import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Define the type for the global variable for type safety
declare global {
  interface Window {
    pptx2json: any;
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
  // The pptx2json library attaches itself to the window object.
  // We'll wait until it's available before starting the React app.
  if (typeof window.pptx2json !== 'undefined') {
    console.log('pptx2json library found. Starting the application.');
    startApp();
  } else {
    // If not found, wait a bit and check again.
    console.warn('pptx2json library not yet available, retrying in 100ms...');
    setTimeout(checkLibraryAndStart, 100);
  }
};

// Start the check to launch the application
checkLibraryAndStart();
