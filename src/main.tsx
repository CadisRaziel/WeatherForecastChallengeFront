import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import { MainRouter } from './routes';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MainRouter /> {/* Renderize a classe de roteamento */}
  </StrictMode>
);
