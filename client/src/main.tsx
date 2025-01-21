import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Toaster
      position="top-right"
      reverseOrder={true}
      toastOptions={{ duration: 5000 }}
    />
    <App />
  </BrowserRouter>
);
