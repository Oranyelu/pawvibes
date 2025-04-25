// main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';  // Your global CSS file
import { BrowserRouter } from 'react-router-dom';  // Import BrowserRouter for routing
import { CartProvider } from './context/CartContext';  // Import CartProvider
import App from './App';  // Import your App component

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

// Wrap your App component with CartProvider and BrowserRouter to provide context and routing.
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <App />
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);
