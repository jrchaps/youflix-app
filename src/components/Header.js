import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { fetchVideos } from '../store/actions';
import styled from 'styled-components/macro';
import { useHistory, useLocation, NavLink } from 'react-router-dom';

const HeaderBar = styled.header`
  position: fixed;
  display: flex;
  height: 64px;
  width: 100%;
  padding: 0px 50px;
  box-sizing: border-box;
  z-index: 2;
  background: ${props => props.theme.color.primary.dark};
  box-shadow: ${props => props.theme.shadow};
  transform: ${props =>
    props.isHidden ? 'translateY(-70px)' : 'translateY(0)'};
  @media (max-width: 768px) {
    flex-wrap: wrap;
    height: auto;
    transform: ${props =>
      props.isHidden ? 'translateY(-48px)' : 'translateY(0)'};
    padding: 0px 16px;
  }
  transition: transform 0.3s ${props => props.theme.transitionTimingFunction}
    0.2s;
`;

const Header = () => {
  return (
    <HeaderBar>
      <Nav />
      <SearchForm />
    </HeaderBar>
  );
};

export default Header;

const StyledNav = styled.nav`
  display: flex;
  flex-grow: 1;
  @media (max-width: 768px) {
    justify-content: center;
    height: 56px;
    order: 1;
  }
`;

const NavTab = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-right: 30px;
  @media (max-width: 768px) {
    margin: 0px auto;
  }
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  padding: 0px 20px;
  text-decoration: none;
  color: ${props => props.theme.white.light};
  &:hover {
    color: ${props => props.theme.white.medium};
  }
  &.active {
    color: ${props => props.theme.white.light};
  }
  transition: color 0.2s ${props => props.theme.transitionTimingFunction};
`;

const NavIndicator = styled.div`
  position: absolute;
  align-self: flex-end;
  width: 100%;
  height: 4px;
  background: ${props => props.theme.white.light};
  transform: ${props => (props.active ? 'scaleY(1)' : 'scaleY(0)')};
  transform-origin: bottom;
  transition: transform 0.3s ${props => props.theme.transitionTimingFunction};
`;

const Nav = () => {
  const location = useLocation();

  return (
    <StyledNav>
      <NavTab>
        <StyledNavLink exact to='/'>
          Home
        </StyledNavLink>
        <NavIndicator active={location.pathname === '/'} />
      </NavTab>
      <NavTab>
        <StyledNavLink to='favorites'>My Theatre</StyledNavLink>
        <NavIndicator active={location.pathname === '/favorites'} />
      </NavTab>
    </StyledNav>
  );
};

const SearchFormContainer = styled.div`
  display: flex;
  align-items: center;
  width: 400px;
  @media (max-width: 768px) {
    height: 48px;
    width: 100%;
  }
`;

const StyledForm = styled.form`
  display: flex;
  width: 100%;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid ${props => props.theme.white.medium};
`;

const SearchFormButton = styled.button`
  display: flex;
  cursor: pointer;
  user-select: none;
  background: none;
  border: none;
  color: ${props => props.theme.white.light};
  &:hover {
    color: ${props => props.theme.white.medium};
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 8px;
  user-select: none;
  outline: none;
  background: none;
  border: none;
  color: ${props => props.theme.white.light};
`;

const SearchForm = () => {
  const [query, setQuery] = useState('');
  const { search } = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const inputRef = useRef();

  useEffect(() => {
    if (search) {
      let query = search.split('=')[1];
      query = query.split('%20');
      query = query.join(' ');
      setQuery(query);
      dispatch(fetchVideos(query));
    }
  }, [search, dispatch]);

  const handleSubmit = e => {
    e.preventDefault();
    history.push(`/?search=${query}`);
    dispatch(fetchVideos(query));
  };

  const handleReset = e => {
    setQuery('');
    inputRef.current.focus();
  };

  const handleButtonClick = e => {
    e.preventDefault();
  };

  const handleInputChange = e => {
    setQuery(e.target.value);
  };
  return (
    <SearchFormContainer>
      <StyledForm
        onSubmit={handleSubmit}
        onReset={handleReset}
        className='search-form'
      >
        <SearchFormButton type='submit' onMouseDown={handleButtonClick}>
          <i className='material-icons'>search</i>
        </SearchFormButton>
        <SearchInput
          placeholder='Search for videos...'
          value={query}
          onChange={handleInputChange}
          ref={inputRef}
        />
        {query && (
          <SearchFormButton type='reset' onMouseDown={handleButtonClick}>
            <i className='material-icons'>clear</i>
          </SearchFormButton>
        )}
      </StyledForm>
    </SearchFormContainer>
  );
};
