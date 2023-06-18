import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Layout from './app/layout/Layout';
import { AuthProvider } from './context/AuthProvider';
import 'normalize.css';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

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
