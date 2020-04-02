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
