import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {ThemeProvider} from '@mui/material';
import {theme} from './theme';
import {BrowserRouter} from 'react-router-dom';

export const AppContext = createContext({
  user: 'NONE',
  changeUser: () => {}
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
      <ThemeProvider theme={theme}>
          <App/>
      </ThemeProvider>
    </BrowserRouter>
);
