import axios from 'axios';
import {
  FETCH_ARTISTS_START,
  FETCH_ARTISTS_SUCCESS,
  FETCH_ARTISTS_FAILURE,
  SELECT_FAVORITE_ARTIST,
  DESELECT_FAVORITE_ARTIST,
  REQUEST_FAVORITE_ARTISTS_START,
  REQUEST_FAVORITE_ARTISTS_SUCCESS,
  REQUEST_FAVORITE_ARTISTS_FAILURE
} from '../constants/index';

export const fetchArtists = dispatch => async userId => {
  dispatch({ type: FETCH_ARTISTS_START, userId });

  try {
    const { data: { artistList, favoriteArtists }} = await axios.get(`http://localhost:8080/users/${userId}/favorites`);
    const selectedArtists = {};
    favoriteArtists.forEach(artistId => selectedArtists[artistId] = true);


    dispatch({ type: FETCH_ARTISTS_SUCCESS, artistList, selectedArtists });
  } catch (err) {
    dispatch({ type: FETCH_ARTISTS_FAILURE, error: err.response.data.errorMessage });
  }
};

export const selectArtist = dispatch => artistId => {
  dispatch({ type: SELECT_FAVORITE_ARTIST, artistId });
};

export const deselectArtist = dispatch => artistId => {
  dispatch({ type: DESELECT_FAVORITE_ARTIST, artistId });
};

export const saveFavoriteArtists = dispatch => async (userId, selectedArtists) => {
  dispatch({ type: REQUEST_FAVORITE_ARTISTS_START });

  try {
    await axios.post(
      `http://localhost:8080/users/${userId}/favorites`,
      selectedArtists
    );

    dispatch({ type: REQUEST_FAVORITE_ARTISTS_SUCCESS });
  } catch (err) {
    dispatch({ type: REQUEST_FAVORITE_ARTISTS_FAILURE, error: err.response.data.errorMessage });
  }
};
