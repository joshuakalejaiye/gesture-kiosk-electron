import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { GlobalStyles } from "./styles/globalStyles";
import { jsx, ThemeProvider } from '@emotion/react'

const theme = {
  colors: {
    primary: '#212121',
    secondary: '#111'
  },
}

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
