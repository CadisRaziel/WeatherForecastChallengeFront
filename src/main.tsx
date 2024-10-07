import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import { AuthProvider } from './services/context/auth';
import { AlertProvider } from './components/alert';
import { LoadingProvider } from './components/loading';
import { BrowserRouter } from 'react-router-dom';
import App from './App';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AlertProvider>
      <LoadingProvider>
        <AuthProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AuthProvider>
      </LoadingProvider>
    </AlertProvider>,
  </StrictMode>
);
