export const SET_FETCHED_VIDEOS = 'SET_FETCHED_VIDEOS';
export const setFetchedVideos = (topic, results) => {
  return {
    type: SET_FETCHED_VIDEOS,
    topic,
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

export const fetchVideos = (topic, topicId) => {
  return async dispatch => {
    dispatch(networkError(false));
    dispatch(isFetching(true));
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=12&topicId=${topicId}&type=video&videoEmbeddable=true&key=${process.env.REACT_APP_API_KEY}`,
      );
      const data = await response.json();
      dispatch(setFetchedVideos(topic, data.items));
      dispatch(isFetching(false));
    } catch (error) {
      dispatch(isFetching(false));
      dispatch(networkError(true));
    }
  };
};
