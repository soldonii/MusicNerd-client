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

const initialState = {
  loading: true,
  token: null,
  user: null,
  isAuthenticated: false,
  error: null
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_FAILURE:
      return {
        ...state,
        error: action.message
      };

    case SIGNUP_SUCCESS:
      localStorage.setItem('token', action.token);
      return {
        ...state,
        token: action.token,
        error: null
      };

    case LOGIN_FAILURE:
      return {
        ...state,
        error: action.message
      };

    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.token);
      return {
        ...state,
        token: action.token,
        user: action.userId,
        error: null,
        isAuthenticated: true
      };

    default:
      return state;
  }
};
