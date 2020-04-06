import {
  REQUEST_SIGNUP_START,
  REQUEST_SIGNUP_SUCCESS,
  REQUEST_SIGNUP_FAILURE,
  REQUEST_LOGIN_START,
  REQUEST_LOGIN_SUCCESS,
  REQUEST_LOGIN_FAILURE,
  LOGOUT,
  CLEAR_ERROR,
} from '../constants/index';
import { setTokenToHeader } from '../lib/auth';

const initialState = {
  token: '',
  userId: '',
  hasSignedUp: false,
  isAuthenticated: false,
  loading: false,
  error: null
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_SIGNUP_START:
      return {
        ...state,
        loading: true
      };

    case REQUEST_SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        hasSignedUp: true
      };

    case REQUEST_SIGNUP_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    case REQUEST_LOGIN_START:
      return {
        ...state,
        loading: true
      };

    case REQUEST_LOGIN_SUCCESS:
      localStorage.setItem('token', action.token);
      setTokenToHeader(action.token);

      return {
        ...state,
        loading: false,
        token: action.token,
        userId: action.userId,
        isAuthenticated: true
      };

    case REQUEST_LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    case CLEAR_ERROR:
      return {
        ...state,
        loading: false,
        error: null
      };

    case LOGOUT:
      localStorage.removeItem('token');
      return {
        token: '',
        userId: '',
        hasSignedUp: false,
        isAuthenticated: false,
        loading: false,
        error: null
      };

    default:
      return state;
  }
};
