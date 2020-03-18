import {
  SET_FETCHED_SEARCHED_VIDEOS,
  SET_FETCHED_HOME_VIDEOS,
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  NETWORK_ERROR,
  IS_FETCHING,
} from './actions';
import { combineReducers } from 'redux';

const fetchedSearchedVideosReducer = (state = [], { results, type }) => {
  switch (type) {
    case SET_FETCHED_SEARCHED_VIDEOS:
      return [...results];
    default:
      return state;
  }
};

const fetchedHomeVideosReducer = (state = [], { results, type }) => {
  switch (type) {
    case SET_FETCHED_HOME_VIDEOS:
      return [...results];
    default:
      return state;
  }
};

const favoritesReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_FAVORITE:
      return { [action.id]: action.video, ...state };
    case REMOVE_FAVORITE:
      return { ...delete state[action.id], ...state };
    default:
      return state;
  }
};

const networkErrorReducer = (state = false, action) => {
  switch (action.type) {
    case NETWORK_ERROR:
      return action.boolean;
    default:
      return state;
  }
};

const isFetchingReducer = (state = false, action) => {
  switch (action.type) {
    case IS_FETCHING:
      return action.boolean;
    default:
      return state;
  }
};

export const allReducers = combineReducers({
  fetchedHomeVideos: fetchedHomeVideosReducer,
  fetchedSearchedVideos: fetchedSearchedVideosReducer,
  favorites: favoritesReducer,
  networkError: networkErrorReducer,
  isFetching: isFetchingReducer,
});
