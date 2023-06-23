import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Layout from './app/layout/Layout';
import { AuthProvider } from './context/AuthProvider';
import 'normalize.css';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import '@fontsource/source-code-pro'; // Defaults to weight 400
import '@fontsource/source-code-pro/400.css'; // Specify weight
import '@fontsource/source-code-pro/400-italic.css'; // Specify weight and style

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <App />
          <Toaster />
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
);
