export const SET_FETCHED_SEARCHED_VIDEOS = 'SET_FETCHED_SEARCHED_VIDEOS';
export const setFetchedSearchedVideos = results => {
  return {
    type: SET_FETCHED_SEARCHED_VIDEOS,
    results,
  };
};

export const SET_FETCHED_HOME_VIDEOS = 'SET_FETCHED_HOME_VIDEOS';
export const setFetchedHomeVideos = results => {
  return {
    type: SET_FETCHED_HOME_VIDEOS,
    results,
  };
};

export const ADD_FAVORITE = 'ADD_FAVORITE';
export const addFavorite = video => {
  return {
    type: ADD_FAVORITE,
    video,
    id: video.id.videoId,
  };
};

export const REMOVE_FAVORITE = 'REMOVE_FAVORITE';
export const removeFavorite = videoId => {
  return {
    type: REMOVE_FAVORITE,
    id: videoId,
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

export const fetchHomeVideos = topics => {
  return async dispatch => {
    dispatch(networkError(false));
    dispatch(isFetching(true));
    try {
      const promises = Object.keys(topics).map(async topic => {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=12&topicId=${topics[topic]}&type=video&videoEmbeddable=true&key=${process.env.REACT_APP_API_KEY}`,
        );
        const data = await response.json();
        return data.items;
      });
      const videos = await Promise.all(promises);
      dispatch(setFetchedHomeVideos(videos));
      dispatch(isFetching(false));
    } catch (error) {
      dispatch(isFetching(false));
      dispatch(networkError(true));
    }
  };
};

export const fetchSearchedVideos = (query, history) => {
  return async dispatch => {
    dispatch(networkError(false));
    dispatch(isFetching(true));
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=12&q=${query}&type=video&videoEmbeddable=true&key=${process.env.REACT_APP_API_KEY}`,
      );
      const data = await response.json();
      dispatch(setFetchedSearchedVideos(data.items));
      dispatch(isFetching(false));
      history.push(`/search?=${query}`);
    } catch (error) {
      dispatch(isFetching(false));
      dispatch(networkError(true));
    }
  };
};
