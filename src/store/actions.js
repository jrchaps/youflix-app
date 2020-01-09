export const SET_FETCHED_RECIPES = 'SET_FETCHED_RECIPES';
export const setFetchedRecipes = results => {
  return {
    type: SET_FETCHED_RECIPES,
    results,
  };
};

export const ADD_FAVORITE = 'ADD_FAVORITE';
export const addFavorite = recipe => {
  return {
    type: ADD_FAVORITE,
    recipe,
    uri: recipe.recipe.uri,
  };
};

export const REMOVE_FAVORITE = 'REMOVE_FAVORITE';
export const removeFavorite = uri => {
  return {
    type: REMOVE_FAVORITE,
    uri,
  };
};

export const NETWORK_ERROR = 'NETWORK_ERROR';
export const networkError = boolean => {
  return {
    type: NETWORK_ERROR,
    boolean,
  };
};

export const IS_FETCHING = 'IS_FETCHING';
export const isFetching = boolean => {
  return {
    type: IS_FETCHING,
    boolean,
  };
};

export const fetchRecipes = query => {
  return async dispatch => {
    if (query) {
      dispatch(networkError(false));
      dispatch(isFetching(true));
      try {
        const response = await fetch(
          `https://api.edamam.com/search?q=${query}&app_id=${process.env.REACT_APP_API_ID}&app_key=${process.env.REACT_APP_API_KEY}`,
        );
        const data = await response.json();
        data.hits.length !== 0
          ? dispatch(setFetchedRecipes(data.hits)) &&
            dispatch(isFetching(false))
          : dispatch(setFetchedRecipes([query])) && dispatch(isFetching(false));
      } catch (error) {
        dispatch(isFetching(false));
        dispatch(networkError(true));
      }
    } else {
      dispatch(setFetchedRecipes([]));
    }
  };
};
