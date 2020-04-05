import {
  FETCH_ARTISTS_START,
  FETCH_ARTISTS_SUCCESS,
  FETCH_ARTISTS_FAILURE,
  // SELECT_FAVORITE_ARTIST,
  // DESELECT_FAVORITE_ARTIST
} from '../constants/index';

const initialState = {
  userId: null,
  loading: false,
  error: null,
  artistList: [],
  selectedArists: {}
};

export const artistReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ARTISTS_START:
      return {
        ...state,
        userId: action.userId,
        loading: true
      };

    case FETCH_ARTISTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        artistList: action.artistList
      };

    case FETCH_ARTISTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    default:
      return state;
  }
};
