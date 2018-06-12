import * as types from '../types';

const initialState = {
  signedIn: false,
  loading: false,
  awaitingConfirmation: false,
  error: null,
  user: null
};

export default (state = initialState, action = {}) => {

  if (action.type === types.CONFIRM_SIGNUP_SUCCESS) {
    return { ...state, signedIn: true };
  }

  if (action.type === types.CONFIRM_SIGNUP_FAILURE) {
    return {
      ...state,
      signedIn: false,
      error: action.payload,
      awaitingConfirmation: true,
      loading: false
    }
  }

  if (action.type === types.SIGN_UP_REQUEST) {
    return { 
      ...state, 
      loading: true,
      error: null
    };
  }

  if (action.type === types.SIGN_UP_SUCCESS) {
    return {
      ...state,
      loading: false,
      awaitingConfirmation: true,
      user: action.payload,
      error: null
    };
  }

  if (action.type === types.SIGN_UP_FAILURE) {
    return {
      ...state,
      loading: false,
      error: action.payload,
      user: null,
      awaitingConfirmation: false
    };
  }

  if (action.type === types.SIGN_IN_SUCCESS) {
    return {
      ...state,
      loading: false,
      error: null,
      user: action.payload.user,
      action: action.payload.awaitingConfirmation,
      signedIn: true
    };
  }

  return state;
};