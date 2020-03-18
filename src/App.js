import React, { useEffect } from 'react';
import { BrowserRouter, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import LibraryPage from './pages/LibraryPage';
import WatchPage from './pages/WatchPage';
import SearchPage from './pages/SearchPage';

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
      <Route path='/'>
        <Header />
      </Route>
      <Route exact path='/'>
        <HomePage />
      </Route>
      <Route path='/watch=:videoId'>
        <WatchPage />
      </Route>
      <Route path='/library'>
        <LibraryPage />
      </Route>
      <Route path='/search'>
        <SearchPage />
      </Route>
    </BrowserRouter>
  );
};

export default App;
