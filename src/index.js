import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import PrivyConfig from './PrivyConfig';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <PrivyConfig>
      <App />
    </PrivyConfig>
  </React.StrictMode>,
);
