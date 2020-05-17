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

const signUpRequest = () => ({ type: SIGNUP_REQUEST });
const signUpSuccess = () => ({ type: SIGNUP_SUCCESS });
const signUpFailed = err => ({ type: SIGNUP_FAILED, error: err.response.data.errorMessage });

const clearAuthError = () => ({ type: CLEAR_AUTH_ERROR });

export const signUp = user => {
  return async dispatch => {
    try {
      dispatch(signUpRequest());

      await axios.post(`${process.env.REACT_APP_SERVER_URI}/auth/signup`, user);
      dispatch(signUpSuccess());

      return history.push('/auth/login');
    } catch (err) {
      dispatch(signUpFailed(err));

      const errorTimeoutId = window.setTimeout(() => {
        dispatch(clearAuthError());

        return window.clearTimeout(errorTimeoutId);
      }, 2000);
    }
  }
};

const loginRequest = () => ({ type: LOGIN_REQUEST });
const loginSuccess = (token, userId) => ({ type: LOGIN_SUCCESS, token, userId });
const loginFailed = err => ({ type: LOGIN_FAILED, error: err.response.data.errorMessage });

export const login = user => {
  return async dispatch => {
    try {
      dispatch(loginRequest());

      const response = await axios.post(`${process.env.REACT_APP_SERVER_URI}/auth/login`, user);
      const { token, userId } = response.data;

      dispatch(loginSuccess(token, userId));
      localStorage.setItem('token', token);

      return history.push(`/users/${userId}/favorites`);
    } catch (err) {
      dispatch(loginFailed(err));

      const errorTimeoutId = window.setTimeout(() => {
        dispatch(clearAuthError());

        return window.clearTimeout(errorTimeoutId);
      }, 2000);
    }
  }
};

export const logout = dispatch => () => {
  dispatch({ type: LOGOUT });
  localStorage.removeItem('token');

  return history.push('/');
};
