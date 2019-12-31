import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory, useLocation } from 'react-router-dom';
import { fade, makeStyles } from '@material-ui/core/styles';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Grid from '@material-ui/core/Grid';
import Slide from '@material-ui/core/Slide';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles(theme => ({
  tabsContainer: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'initial',
    },
  },
  tabs: {
    backgroundColor: theme.palette.common.white,
    height: 3,
    marginBottom: 10,
  },
  tab: {
    ...theme.mixins.toolbar,
    textTransform: 'none',
    fontSize: theme.typography.pxToRem(15),
  },
  searchForm: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: theme.spacing(0, 1, 0, 1),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    [theme.breakpoints.up('sm')]: {
      width: 'auto',
    },
  },
  searchIconContainer: {
    width: theme.spacing(6),
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 1),
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: 150,
      '&:focus': {
        width: 250,
      },
    },
  },
  inputIcon: {
    width: 25,
    display: 'flex',
  },
  rightGrid: {
    display: 'none',
    [theme.breakpoints.up('lg')]: {
      display: 'initial',
    },
  },
}));

const Header = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [query, setQuery] = useState('');

  useEffect(() => {
    window.onscroll = () => {
      console.log(document.documentElement.scrollTop);
    };
  });

  const handleInputChange = e => {
    setQuery(e.target.value);
  };

  const clearInput = e => {
    e.preventDefault();
    setQuery('');
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log('submitted');
    history.push('/');
  };

  return (
    <React.Fragment>
      <AppBar>
        <Toolbar>
          <Grid container className={classes.tabsContainer}>
            <Tabs
              value={location.pathname}
              classes={{ indicator: classes.tabs }}
            >
              <Tab
                component={Link}
                to='/'
                value='/'
                label='Home'
                className={classes.tab}
              ></Tab>
              <Tab
                component={Link}
                to='/my-theatre'
                value='/my-theatre'
                label='My Theatre'
                className={classes.tab}
              ></Tab>
            </Tabs>
          </Grid>
          <form className={classes.searchForm} onSubmit={handleSubmit}>
            <button type='submit' className={classes.inputIcon}>
              <SearchIcon />
            </button>
            <InputBase
              id='input'
              type='text'
              placeholder='Search for videos...'
              onChange={handleInputChange}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              value={query}
            ></InputBase>
            {query && (
              <div className={classes.inputIcon}>
                <ClearIcon onMouseDown={clearInput} />
              </div>
            )}
          </form>
          <Grid container className={classes.rightGrid} />
        </Toolbar>
      </AppBar>
      <Toolbar />
    </React.Fragment>
  );
};

export default Header;
