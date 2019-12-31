import React from 'react';
import HomePage from './pages/HomePage';
import Header from './components/Header';
import { BrowserRouter, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

const App = () => {
  return (
    <CssBaseline>
      <BrowserRouter>
        <Route path='/' component={Header} />
        <Route path='/' component={HomePage} />
      </BrowserRouter>
    </CssBaseline>
  );
};

export default App;
