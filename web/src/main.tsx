import 'react-day-picker/style.css';
import './globals.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from './components/ui/provider';
import { App } from './App';
import { Toaster } from './components/ui/toaster';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider>
      <Toaster />
      <App />
    </Provider>
  </StrictMode>
);
