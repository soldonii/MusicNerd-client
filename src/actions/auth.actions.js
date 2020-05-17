import axios from 'axios';
import history from '../lib/history';
import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
  CLEAR_AUTH_ERROR
} from '../constants/index';

export const requestSignup = dispatch => async user => {
  try {
    dispatch({ type: SIGNUP_REQUEST });

    await axios.post(`${process.env.REACT_APP_SERVER_URI}/auth/signup`, user);
    dispatch({ type: SIGNUP_SUCCESS });

    return history.push('/auth/login');
  } catch (err) {
    dispatch({ type: SIGNUP_FAILED, error: err.response.data.errorMessage });

    const errorTimeoutId = window.setTimeout(() => {
      dispatch({ type: CLEAR_AUTH_ERROR });

      return window.clearTimeout(errorTimeoutId);
    }, 2000);
  }
};

export const requestLogin = dispatch => async user => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const response = await axios.post(`${process.env.REACT_APP_SERVER_URI}/auth/login`, user);
    const { token, userId } = response.data;

    dispatch({ type: LOGIN_SUCCESS, token, userId });

    return history.push(`/users/${userId}/favorites`);
  } catch (err) {
    dispatch({ type: LOGIN_FAILED, error: err.response.data.errorMessage });

    const errorTimeoutId = window.setTimeout(() => {
      dispatch({ type: CLEAR_AUTH_ERROR });

      return window.clearTimeout(errorTimeoutId);
    }, 2000);
  }
};

export const logout = dispatch => () => {
  dispatch({ type: LOGOUT });

  return history.push('/');
};
