import * as types from '../types';

const initialState = {
  signedIn: false,
  user: null,
  userConfirmed: null,
};

export default (state = initialState, action = {}) => {
  if (action.type === types.SIGN_IN_SUCCESS) {
    return {
      ...state,
      signedIn: true,
      user: action.payload,
      userConfirmed: action.payload.emailVerified,
    };
  }

  if (action.type === types.SIGN_IN_FAILURE) {
    return {
      ...state,
      user: null,
      userConfirmed: null,
      signedIn: false,
    };
  }

  if (action.type === types.SIGN_UP_REQUEST) {
    return { 
      ...state, 
      signedIn: false,
      user: null,
      userConfirmed: null,
    };
  }

  if (action.type === types.SIGN_UP_SUCCESS) {
    return {
      ...state,
      signedIn: false,
      user: action.payload,
      userConfirmed: false,
    };
  }

  if (action.type === types.SIGN_UP_FAILURE) {
    return {
      ...state,
      signedIn: false,
      user: null,
      userConfirmed: null,
    };
  }

  if (action.type === types.GET_USER_CREDENTIALS_SUCCESS) {
    return {
      ...state,
      user: {
        ...state.user,
        credentials: action.payload
      }
    };
  }

  if (action.type === types.CHECK_AUTHENTICATED_USER_SUCCESS) {
    return {
      ...state,
      signedIn: true,
      user: action.payload,
      userConfirmed: action.payload.emailVerified,
    };
  }

  if (action.type === types.CHECK_AUTHENTICATED_USER_FAILURE) {
    return {
      ...state,
      signedIn: false,
      user: null,
      userConfirmed: null,
    };
  }

  if (action.type === types.SIGN_OUT_SUCCESS) {
    return {
      ...state,
      signedIn: false,
      user: null,
      userConfirmed: null
    };
  }
  // TODO: handle sign out failure?

  if (action.type === types.CONFIRM_USER_ONLY) {
    return {
      ...state,
      userConfirmed: true,
    };
  }

  if (action.type === types.CONFIRM_SIGNUP_SUCCESS) {
    return { 
      ...state,
      signedIn: true,
    };
  }

  if (action.type === types.CONFIRM_SIGNUP_FAILURE) {
    return {
      ...state,
      signedIn: false,
    };
  }
  
  return state;
};
