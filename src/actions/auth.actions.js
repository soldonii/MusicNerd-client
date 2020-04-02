import {
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  AUTH_ERROR,
  CLEAR_ERRORS,
  USER_LOADED
} from '../constants/index';

export const signupSuccess = dispatch => token => {
  dispatch({ type: SIGNUP_SUCCESS, token });
};

export const signupFail = dispatch => message => {
  dispatch({ type: SIGNUP_FAILURE, message });
};

export const loginSuccess = dispatch => (token, userId) => {
  dispatch({ type: LOGIN_SUCCESS, token, userId });
};

export const loginFail = dispatch => message => {
  dispatch({ type: LOGIN_FAILURE, message });
};

