import React from 'react';
import ReactDOM from 'react-dom'; // Use 'react-dom' instead of 'react-dom/client'
import './index.css';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css";
import "remixicon/fonts/remixicon.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';

const root = document.getElementById('root'); // No need to use createRoot() for ReactDOM in this case
ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthContextProvider>
  </React.StrictMode>,
  root
);

