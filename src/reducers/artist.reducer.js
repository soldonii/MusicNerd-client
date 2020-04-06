import {
  FETCH_ARTISTS_REQUEST,
  FETCH_ARTISTS_SUCCESS,
  FETCH_ARTISTS_FAILED,
  SELECT_FAVORITE_ARTIST,
  DESELECT_FAVORITE_ARTIST,
  SAVE_ARTISTS_REQUEST,
  SAVE_ARTISTS_SUCCESS,
  SAVE_ARTISTS_FAILED
} from '../constants/index';

const initialState = {
  userId: null,
  loading: false,
  error: null,
  artistList: [],
  selectedArtists: {},
  result: ''
};

export const artistReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ARTISTS_REQUEST:
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
        artistList: action.artistList,
        selectedArtists: action.selectedArtists
      };

    case FETCH_ARTISTS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    case SELECT_FAVORITE_ARTIST:
      return {
        ...state,
        selectedArtists: {
          ...state.selectedArtists,
          [action.artistId]: true
        }
      };

    case DESELECT_FAVORITE_ARTIST:
      const selectedArtists = {...state.selectedArtists};
      delete selectedArtists[action.artistId];

      return {
        ...state,
        selectedArtists
      };

    case SAVE_ARTISTS_REQUEST:
      return {
        ...state,
        loading: true
      };

    case SAVE_ARTISTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        artistList: [],
        selectedArtists: {},
        result: 'success'
      };

    case SAVE_ARTISTS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
        result: 'failure'
      };

    default:
      return state;
  }
};
