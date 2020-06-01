import axios from 'axios';
import setTokenToHeader from '../lib/auth';
import history from '../lib/history';
import {
  GET_ARTISTS_REQUEST,
  GET_ARTISTS_SUCCESS,
  GET_ARTISTS_FAILED,
  SELECT_FAVORITE_ARTIST,
  DESELECT_FAVORITE_ARTIST,
  SAVE_ARTISTS_REQUEST,
  SAVE_ARTISTS_SUCCESS,
  SAVE_ARTISTS_FAILED,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_ERROR
} from '../constants/index';

export const getArtists = userId => {
  return async dispatch => {
    setTokenToHeader();

    try {
      dispatch({ type: GET_ARTISTS_REQUEST, userId });

      const { data: { artistList, favoriteArtists } }
        = await axios.get(`${process.env.REACT_APP_SERVER_URI}/users/${userId}/favorites`);

      const selectedArtists = {};
      favoriteArtists.forEach(artistId => selectedArtists[artistId] = true);

      dispatch({ type: GET_ARTISTS_SUCCESS, artistList, selectedArtists });
    } catch (err) {
      dispatch({ type: GET_ARTISTS_FAILED, error: err.response.data.errorMessage });
    }
  };
};

export const selectArtist = artistId => {
  return dispatch => dispatch({ type: SELECT_FAVORITE_ARTIST, artistId });
};

export const deselectArtist = artistId => {
  return dispatch => dispatch({ type: DESELECT_FAVORITE_ARTIST, artistId });
};

export const saveFavoriteArtists = (userId, selectedArtists) => {
  return async dispatch => {
    setTokenToHeader();

    try {
      dispatch({ type: SAVE_ARTISTS_REQUEST });

      await axios.post(`${process.env.REACT_APP_SERVER_URI}/users/${userId}/favorites`, selectedArtists);
      dispatch({ type: SAVE_ARTISTS_SUCCESS });

      return history.push('/waiting');
    } catch (err) {
      dispatch({ type: SAVE_ARTISTS_FAILED, error: err.response.data.errorMessage });
    }
  };
};

export const getProfile = userId => {
  return async dispatch => {
    setTokenToHeader();

    try {
      dispatch({ type: GET_PROFILE_REQUEST });

      const { data: userProfile }
        = await axios.get(`${process.env.REACT_APP_SERVER_URI}/users/${userId}/profile`, userId);

      dispatch({ type: GET_PROFILE_SUCCESS, userProfile });
    } catch (err) {
      dispatch({ type: GET_PROFILE_ERROR, error: err.response.data.errorMessage });
    }
  };
};
