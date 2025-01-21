import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { StrictMode } from 'react';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Toaster
        position="top-right"
        reverseOrder={true}
        toastOptions={{ duration: 5000 }}
      />
      <App />
    </BrowserRouter>
  </StrictMode>
);
