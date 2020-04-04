import {
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  // LOGOUT,
  SET_LOADING,
  CLEAR_ERROR,
} from '../constants/index';
import setTokenToHeader from '../lib/setTokenToHeader';

const initialState = {
  token: null,
  userId: null,
  isAuthenticated: false,
  loading: false,
  error: null
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.errorMessage
      };

    case SIGNUP_SUCCESS:
      localStorage.setItem('token', action.token);
      return {
        ...state,
        loading: false,
        error: null
      };

    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.errorMessage
      };

    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.token);
      setTokenToHeader(action.token);

      return {
        ...state,
        token: action.token,
        userId: action.userId,
        isAuthenticated: true,
        error: null
      };

    case SET_LOADING:
      return {
        ...state,
        loading: true
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
