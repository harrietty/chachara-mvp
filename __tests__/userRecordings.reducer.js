import * as actions from '../src/actions/content.actions';
import userRecordings from '../src/reducers/userRecordings';

describe('userRecordings reducer', () => {
  const initialState = {
    loading: false,
    recordings: [],
    error: null
  };
  
  test('receiving action FETCH_USER_RECORDINGS_REQUEST', () => {
    const action = actions.fetchUserRecordingsRequest();
    expect(userRecordings(initialState, action)).toEqual({
      loading: true,
      recordings: [],
      error: null
    });
  });

  test('receiving action FETCH_USER_RECORDINGS_SUCCESS', () => {
    const action = actions.fetchUserRecordingsSuccess(['foo']);
    expect(userRecordings(initialState, action)).toEqual({
      loading: false,
      recordings: ['foo'],
      error: null
    });
  });
  
  test('receiving action FETCH_USER_RECORDINGS_FAILURE', () => {
    const action = actions.fetchUserRecordingsFailure('oh no');
    expect(userRecordings(initialState, action)).toEqual({
      loading: false,
      recordings: [],
      error: 'oh no'
    });
  });
});