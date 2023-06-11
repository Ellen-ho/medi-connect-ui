import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Layout from './app/layout/Layout';
import { AuthProvider } from './context/AuthProvider';
import 'normalize.css';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <App />
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
);
