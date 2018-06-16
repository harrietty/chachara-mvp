import * as types from '../types';

const initialState = {
  error: null,
  username: '',
  password: '',
  loading: false
};

export default (state = initialState, action) => {
  if (action.type === types.UPDATE_SIGNIN_FORM) {
    let val = action.payload.value;
    if (action.payload.key === 'username') val = val.toLowerCase();
    return {
      ...state,
      [action.payload.key]: val
    };
  }

  if (action.type === types.SIGN_IN_REQUEST) {
    return {
      ...state,
      loading: true,
      error: null,
    };
  }

  if (action.type === types.SIGN_IN_FAILURE) {
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  }

  if (action.type === types.SIGN_IN_SUCCESS) {
    return {
      ...state,
      loading: false,
      error: null,
      username: '',
      password: ''
    };
  }

  if (action.type === types.CONFIRM_SIGNUP_FAILURE) {
    return {
      ...state,
      loading: false,
      error: null,
      username: '',
      password: ''
    };
  }

  if (action.type === types.CONFIRM_SIGNUP_SUCCESS) {
    return {
      ...state,
      username: '',
      password: ''
    };
  }

  if (action.type === types.CLEAR_SIGNIN_ERROR) {
    return {
      ...state,
      error: null,
    };
  }
  
  if (action.type === types.CREATE_SIGNIN_ERROR) {
    return {
      ...state,
      error: action.payload,
    };
  }

  if (action.type === types.CHECK_AUTHENTICATED_USER_REQUEST) {
    return {
      ...state,
      loading: true,
    };
  }

  if (action.type === types.CHECK_AUTHENTICATED_USER_FAILURE) {
    return {
      ...state,
      loading: false,
    };
  }

  if (action.type === types.CHECK_AUTHENTICATED_USER_SUCCESS) {
    return {
      ...state,
      loading: false,
    };
  }

  if (action.type === types.GET_USER_CREDENTIALS_REQUEST) {
    return {
      ...state,
      loading: true,
    };
  }
  
  if (action.type === types.GET_USER_CREDENTIALS_SUCCESS) {
    return {
      ...state,
      loading: false,
    };
  }

  return state;
};
