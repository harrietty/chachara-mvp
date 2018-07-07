import * as actions from '../src/actions/content.actions';
import reducer from '../src/reducers/content';

describe('content reducer', () => {
  const initialState = {
    isUploading: false,
    uploadStatus: null,
    questions: {},
    loadQuestionsError: null,
    questionsLoading: false
  };

  test('receiving action UPLOAD_TO_S3_REQUEST', () => {
    const action = actions.uploadToS3Request();
    expect(reducer(initialState, action)).toEqual({
      isUploading: true,
      uploadStatus: null,
      questions: {},
      loadQuestionsError: null,
      questionsLoading: false
    });
  });
  
  test('receiving action UPLOAD_TO_S3_SUCCESS', () => {
    const action = actions.uploadToS3Success();
    expect(reducer(initialState, action)).toEqual({
      isUploading: false,
      uploadStatus: 'success',
      questions: {},
      loadQuestionsError: null,
      questionsLoading: false
    });
  });
  
  test('receiving action UPLOAD_TO_S3_FAILURE', () => {
    const action = actions.uploadToS3Failure();
    expect(reducer(initialState, action)).toEqual({
      isUploading: false,
      uploadStatus: 'failure',
      questions: {},
      loadQuestionsError: null,
      questionsLoading: false
    });
  });

  test('receiving action FETCH_QUESTIONS_REQUEST', () => {
    const action = actions.fetchQuestionsRequest();
    expect(reducer(initialState, action)).toEqual({
      isUploading: false,
      uploadStatus: null,
      questions: {},
      loadQuestionsError: null,
      questionsLoading: true
    });
  });

  test('receiving action FETCH_QUESTIONS_FAILURE', () => {
    const action = actions.fetchQuestionsError('oh no');
    expect(reducer(initialState, action)).toEqual({
      isUploading: false,
      uploadStatus: null,
      questions: {},
      loadQuestionsError: 'oh no',
      questionsLoading: false
    });
  });
  
  test('receiving action FETCH_QUESTIONS_SUCCESS', () => {
    const action = actions.fetchQuestionsSuccess([
      {_id: '123', text: 'Hola'}
    ]);
    expect(reducer(initialState, action)).toEqual({
      isUploading: false,
      uploadStatus: null,
      questions: {
        123: {
          _id: '123',
          text: 'Hola'
        }
      },
      loadQuestionsError: null,
      questionsLoading: false
    });
  });
});