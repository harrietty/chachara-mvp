import * as types from '../types';

const initialState = {
  error: null,
  loading: false,
  username: '',
  code: '',
};

export default (state = initialState, action) => {
  if (action.type === types.CONFIRM_SIGNUP_REQUEST) {
    return {
      ...state,
      error: null,
      loading: true,
    };
  }

  if (action.type === types.CONFIRM_SIGNUP_SUCCESS) {
    return {
      ...state,
      error: null,
      loading: false,
      username: '',
      code: '',
    };
  }

  if (action.type === types.CONFIRM_SIGNUP_FAILURE) {
    return {
      ...state,
      error: action.payload,
      loading: false,
    };
  }

  if (action.type === types.UPDATE_CONFIRM_FORM) {
    return {
      ...state,
      [action.payload.key]: action.payload.value,
    };
  }
  return state;
};
