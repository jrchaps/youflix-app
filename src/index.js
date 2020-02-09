import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import normalize from 'normalize.css';
import { ThemeProvider } from 'styled-components/macro';
import * as serviceWorker from './serviceWorker';
import { allReducers } from './store/reducers';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createGlobalStyle } from 'styled-components/macro';

const theme = {
  bodyBackground: '#1b1b1b',
  fontFamily: 'Roboto',
  black: {
    dark: 'rgba(0, 0, 0, 0.87)',
    medium: 'rgba(0, 0, 0, 0.6)',
    light: 'rgba(0, 0, 0, 0.38)',
  },
  white: {
    dark: 'rgba(255, 255, 255, 0.38)',
    medium: 'rgba(255, 255, 255, 0.6)',
    light: 'rgba(255, 255, 255, 0.87)',
  },
  color: {
    primary: {
      main: '#424242',
      dark: '#1b1b1b',
      light: '#6d6d6d',
    },
    secondary: {
      main: '#d32f2f',
      dark: '#9a0007',
      light: '#ff6659',
    },
  },
  transitionTimingFunction: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
  shadow: '0px 1px 3px 1px rgba(0, 0, 0, 0.2)',
};

const GlobalStyle = createGlobalStyle`
 body {
  background: ${props => props.theme.bodyBackground};
  font-family: ${props => props.theme.fontFamily};
  overflow-x: hidden;
}
`;

const store = createStore(
  allReducers,
  compose(
    applyMiddleware(thunkMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : f => f,
  ),
);

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
