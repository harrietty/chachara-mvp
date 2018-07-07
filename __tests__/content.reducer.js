import * as actions from '../src/actions/content.actions';
import reducer from '../src/reducers/content';

describe('content reducer', () => {
  const initialState = {
    isUploading: false,
    uploadStatus: null,
  };

  test('receiving action UPLOAD_TO_S3_REQUEST', () => {
    const action = actions.uploadToS3Request();
    expect(reducer(initialState, action)).toEqual({
      isUploading: true,
      uploadStatus: null,
    });
  });
  
  test('receiving action UPLOAD_TO_S3_SUCCESS', () => {
    const action = actions.uploadToS3Success();
    expect(reducer(initialState, action)).toEqual({
      isUploading: false,
      uploadStatus: 'success',
    });
  });
  
  test('receiving action UPLOAD_TO_S3_FAILURE', () => {
    const action = actions.uploadToS3Failure();
    expect(reducer(initialState, action)).toEqual({
      isUploading: false,
      uploadStatus: 'failure',
    });
  });
});