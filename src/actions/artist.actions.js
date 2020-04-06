import axios from 'axios';
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

export const fetchArtists = dispatch => async userId => {
  dispatch({ type: FETCH_ARTISTS_REQUEST, userId });

  try {
    const { data: { artistList, favoriteArtists }} = await axios.get(`http://localhost:8080/users/${userId}/favorites`);
    const selectedArtists = {};
    favoriteArtists.forEach(artistId => selectedArtists[artistId] = true);


    dispatch({ type: FETCH_ARTISTS_SUCCESS, artistList, selectedArtists });
  } catch (err) {
    dispatch({ type: FETCH_ARTISTS_FAILED, error: err.response.data.errorMessage });
  }
};

export const selectArtist = dispatch => artistId => {
  dispatch({ type: SELECT_FAVORITE_ARTIST, artistId });
};

export const deselectArtist = dispatch => artistId => {
  dispatch({ type: DESELECT_FAVORITE_ARTIST, artistId });
};

export const saveFavoriteArtists = dispatch => async (userId, selectedArtists) => {
  dispatch({ type: SAVE_ARTISTS_REQUEST });

  try {
    await axios.post(
      `http://localhost:8080/users/${userId}/favorites`,
      selectedArtists
    );

    dispatch({ type: SAVE_ARTISTS_SUCCESS });
  } catch (err) {
    dispatch({ type: SAVE_ARTISTS_FAILED, error: err.response.data.errorMessage });
  }
};
