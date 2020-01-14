import React, { useEffect } from 'react';
import { BrowserRouter, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Route path='/' component={Header} />
      <Route path='/' component={HomePage} />
    </BrowserRouter>
  );
};

export default App;
