import * as types from '../types';

const initialState = {
  loading: false,
  recordings: [],
  error: null
};

export default (state = initialState, action) => {
  if (action.type === types.FETCH_USER_RECORDINGS_REQUEST) {
    return {
      ...state,
      loading: true,
      recordings: [],
      error: null
    };
  }

  if (action.type === types.FETCH_USER_RECORDINGS_SUCCESS) {
    return {
      ...state,
      loading: false,
      recordings: action.payload,
      error: null
    };
  }
  
  if (action.type === types.FETCH_USER_RECORDINGS_FAILURE) {
    return {
      ...state,
      loading: false,
      recordings: [],
      error: action.payload,
    };
  }

  if (action.type === types.DELETE_FROM_S3_REQUEST) {
    return {
      ...state,
      loading: true,
      error: null
    };
  }

  if (action.type === types.DELETE_FROM_S3_SUCCESS) {
    return {
      ...state,
      loading: false,
      error: null,
      recordings: state.recordings.filter(rec => rec._id !== action.payload)
    };
  }

  if (action.type === types.DELETE_FROM_S3_FAILURE) {
    return {
      ...state,
      loading: false,
      error: action.payload
    };
  }

  return state;
};