import {
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  AUTH_ERROR,
  CLEAR_ERROR,
  USER_LOADED
} from '../constants/index';

export const signupSuccess = dispatch => () => {
  dispatch({ type: SIGNUP_SUCCESS });
};

export const signupFail = dispatch => errorMessage => {
  dispatch({ type: SIGNUP_FAILURE, errorMessage });
};

export const loginSuccess = dispatch => (token, userId) => {
  dispatch({ type: LOGIN_SUCCESS, token, userId });
};

export const loginFail = dispatch => errorMessage => {
  dispatch({ type: LOGIN_FAILURE, errorMessage });
};

export const clearError = dispatch => () => {
  dispatch({ type: CLEAR_ERROR });
};

