import * as types from '../types';

const initialState = {
  isUploading: false,
  uploadStatus: null,
};

export default (state = initialState, action) => {
  if (action.type === types.UPLOAD_TO_S3_REQUEST) {
    return {
      ...state,
      isUploading: true,
      uploadStatus: null,
    };
  }

  else if (action.type === types.UPLOAD_TO_S3_SUCCESS) {
    return {
      ...state,
      isUploading: false,
      uploadStatus: 'success',
    };
  }

  else if (action.type === types.UPLOAD_TO_S3_FAILURE) {
    return {
      ...state,
      isUploading: false,
      uploadStatus: 'failure',
    };
  }

  return state;
};
