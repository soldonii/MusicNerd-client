import {
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  // LOGOUT,
  SET_LOADING,
  CLEAR_ERROR
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

export const setLoading = dispatch => () => {
  dispatch({ type: SET_LOADING });
};

export const clearError = dispatch => () => {
  dispatch({ type: CLEAR_ERROR });
};

