import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App.jsx';
import { NextUIProvider } from '@nextui-org/react';
import './index.css';

// Redirección a HTTPS
// if (window.location.protocol !== 'https:') {
//   window.location.href = `https://${window.location.host}${window.location.pathname}`;
// }

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NextUIProvider>
      <App />
    </NextUIProvider>
  </React.StrictMode>,
);
