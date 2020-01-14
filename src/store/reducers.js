import {
  SET_FETCHED_VIDEOS,
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  NETWORK_ERROR,
  IS_FETCHING,
} from './actions';
import { combineReducers } from 'redux';

const fetchedVideosReducer = (state = [], action) => {
  switch (action.type) {
    case SET_FETCHED_VIDEOS:
      return action.results;
    default:
      return state;
  }
};

const favoritesReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_FAVORITE:
      return { [action.uri]: action.recipe, ...state };
    case REMOVE_FAVORITE:
      return { ...delete state[action.uri], ...state };
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
  fetchedVideos: fetchedVideosReducer,
  favorites: favoritesReducer,
  networkError: networkErrorReducer,
  isFetching: isFetchingReducer,
});
