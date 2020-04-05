import axios from 'axios';
import {
  FETCH_ARTISTS_START,
  FETCH_ARTISTS_SUCCESS,
  FETCH_ARTISTS_FAILURE,
  // SELECT_FAVORITE_ARTIST,
  // DESELECT_FAVORITE_ARTIST
} from '../constants/index';

export const fetchArtists = dispatch => async userId => {
  dispatch({ type: FETCH_ARTISTS_START, userId });

  try {
    const { data: { artistList }} = await axios.get(`http://localhost:8080/users/${userId}/favorites`);
    dispatch({ type: FETCH_ARTISTS_SUCCESS, artistList });
  } catch (err) {
    dispatch({ type: FETCH_ARTISTS_FAILURE, error: err.response.data.errorMessage });
  }
};

