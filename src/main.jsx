import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import ListPage from './pages/ListPage';
import ItemPage from './pages/ItemPage';
import FormPage from './pages/FormPage';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#00AAFF', contrastText: '#ffffff' },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/list" replace />} />
          <Route path="/list" element={<ListPage />} />
          <Route path="/item/:id" element={<ItemPage />} />
          <Route path="/form" element={<FormPage />} />
          <Route path="/form/:id" element={<FormPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
