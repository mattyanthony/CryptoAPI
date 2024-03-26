import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import DetailView from './Routes/DetailView';
import Layout from './Routes/Layout';
import NotFound from './Routes/NotFound'; // Import NotFound component
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<App />} />
          <Route path="/coinDetails/:symbol" element={<DetailView />} />
          <Route path="*" element={<NotFound />} /> {/* Catch-all route */}
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
