import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react'
import ThemeProvider from './theme';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider>
    <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
  </ChakraProvider>

);
