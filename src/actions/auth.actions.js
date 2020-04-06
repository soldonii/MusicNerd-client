import axios from 'axios';
import {
  REQUEST_SIGNUP_START,
  REQUEST_SIGNUP_SUCCESS,
  REQUEST_SIGNUP_FAILURE,
  REQUEST_LOGIN_START,
  REQUEST_LOGIN_SUCCESS,
  REQUEST_LOGIN_FAILURE,
  LOGOUT,
  CLEAR_ERROR
} from '../constants/index';

export const requestSignup = dispatch => async user => {
  try {
    dispatch({ type: REQUEST_SIGNUP_START });

    await axios.post('http://localhost:8080/auth/signup', user);
    dispatch({ type: REQUEST_SIGNUP_SUCCESS });
  } catch (err) {
    dispatch({ type: REQUEST_SIGNUP_FAILURE, error: err.response.data.errorMessage});
  }
};

export const requestLogin = dispatch => async user => {
  try {
    dispatch({ type: REQUEST_LOGIN_START });

    const response = await axios.post('http://localhost:8080/auth/login', user);
    const { token, userId } = response.data;
    dispatch({ type: REQUEST_LOGIN_SUCCESS, token, userId });
  } catch (err) {
    dispatch({ type: REQUEST_LOGIN_FAILURE, error: err.response.data.errorMessage });
  }
};

export const requestLogout = dispatch => () => dispatch({ type: LOGOUT });

export const clearError = dispatch => () => dispatch({ type: CLEAR_ERROR });
