import * as types from '../types';

const initialState = {
  error: null,
  email: '',
  username: '',
  password: '',
  confirmPassword: '',
  loading: false
};

export default (state = initialState, action) => {
  if (action.type === types.SIGN_UP_REQUEST) {
    return {
      ...state,
      error: null,
      loading: true,
    };
  }

  if (action.type === types.SIGN_UP_FAILURE) {
    return {
      ...state,
      error: action.payload,
      loading: false
    };
  }

  if (action.type === types.SIGN_UP_SUCCESS) {
    return {
      ...state,
      loading: false,
      error: null,
    };
  }

  if (action.type === types.UPDATE_SIGNUP_FORM) {
    let val = action.payload.value;
    if (action.payload.key === 'username') val = val.toLowerCase();
    return {
      ...state,
      [action.payload.key]: val,
    };
  }

  if (action.type === types.CONFIRM_SIGNUP_SUCCESS) {
    return {
      ...state,
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    };
  }

  if (action.type === types.CONFIRM_SIGNUP_FAILURE) {
    return {
      ...state,
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      loading: false,
    };
  }

  if (action.type === types.CREATE_SIGNUP_ERROR) {
    return {
      ...state,
      error: action.payload,
    };
  }

  if (action.type === types.CLEAR_SIGNUP_ERROR) {
    return {
      ...state,
      error: null,
    };
  }
  return state;
};
