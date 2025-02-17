import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AppContext, rootContext } from './context';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AppContext.Provider value={rootContext}>
      <App />
    </AppContext.Provider>
  </React.StrictMode>
);
