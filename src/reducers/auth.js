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
      signedIn: true,
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

  if (action.type === types.SIGN_OUT_REQUEST) {
    return {
      ...state,
      loading: true
    };
  }

  if (action.type === types.SIGN_OUT_SUCCESS) {
    return {
      ...state,
      loading: false,
      signedIn: false,
      user: null,
      error: null,
      awaitingConfirmation: false
    };
  }

  if (action.type === types.SIGN_OUT_FAILURE) {
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  }

  if (action.type === types.SIGN_IN_REQUEST) {
    return {
      ...state,
      loading: true,
      error: null,
      user: null,
      signedIn: false
    };
  }


  if (action.type === types.SIGN_IN_SUCCESS) {
    return {
      ...state,
      loading: false,
      error: null,
      user: action.payload.user,
      awaitingConfirmation: !action.payload.confirmed,
      signedIn: true
    };
  }

  if (action.type === types.SIGN_IN_FAILURE) {
    return {
      ...state,
      loading: false,
      error: action.payload,
      user: null,
      awaitingConfirmation: false,
      signedIn: false
    };
  }


  return state;
};