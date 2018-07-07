import * as types from '../types';

const initialState = {
  isUploading: false,
  uploadStatus: null,
  questions: {},
  loadQuestionsError: null,
  questionsLoading: false
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

  else if (action.type === types.FETCH_QUESTIONS_REQUEST) {
    return {
      ...state,
      questionsLoading: true
    };
  }

  else if (action.type === types.FETCH_QUESTIONS_SUCCESS) {
    return {
      ...state,
      questions: action.payload.reduce((acc, q) => {
        acc[q._id] = q;
        return acc;
      }, {}),
      loadQuestionsError: null,
      questionsLoading: false,
    };
  }

  else if (action.type === types.FETCH_QUESTIONS_FAILURE) {
    return {
      ...state,
      questions: {},
      loadQuestionsError: action.payload,
      questionsLoading: false,
    };
  }

  return state;
};
