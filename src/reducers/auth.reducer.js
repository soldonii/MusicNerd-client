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

const initialState = {
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
        error: action.errorMessage
      };

    case SIGNUP_SUCCESS:
      localStorage.setItem('token', action.token);
      return {
        ...state,
        error: null
      };

    case LOGIN_FAILURE:
      return {
        ...state,
        error: action.errorMessage
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

    case CLEAR_ERROR:
      return {
        ...state,
        error: null
      };

    default:
      return state;
  }
};
