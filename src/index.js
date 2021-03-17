import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { GlobalStyles } from "./styles/globalStyles";
import { ThemeProvider } from '@emotion/react'
import { BrowserRouter as Router } from 'react-router-dom';

const theme = {
  colors: {
    primary: '#212121',
    secondary: '#111',
    tertiary: 'blue'
  },
}

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
