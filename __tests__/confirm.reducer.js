import * as actions from '../src/actions/auth.actions';
import confirm from '../src/reducers/confirm';

describe('confirm reducer', () => {
  const initialState = {
    error: null,
    loading: false,
    code: '',
    username: '',
  };
  test('receiving action CONFIRM_SIGNUP_REQUEST', () => {
    const action = actions.confirmSignUpRequest();
    expect(confirm(initialState, action)).toEqual({
      error: null,
      loading: true,
      code: '',
      username: '',
    });
  });

  test('receiving action CONFIRM_SIGNUP_SUCCESS', () => {
    const action = actions.confirmSignUpSuccess();
    expect(confirm(initialState, action)).toEqual({
      error: null,
      loading: false,
      code: '',
      username: '',
    });
  });
  
  test('receiving action CONFIRM_SIGNUP_FAILURE', () => {
    const action = actions.confirmSignUpFailure('oh no');
    expect(confirm(initialState, action)).toEqual({
      error: 'oh no',
      loading: false,
      code: '',
      username: ''
    });
  });
  
  test('receiving action UPDATE_CONFIRM_FORM', () => {
    let action = actions.updateConfirmForm('code', '123');
    expect(confirm(initialState, action)).toEqual({
      error: null,
      loading: false,
      code: '123',
      username: ''
    });
    
    action = actions.updateConfirmForm('username', 'foo');
    expect(confirm(initialState, action)).toEqual({
      error: null,
      loading: false,
      code: '',
      username: 'foo'
    });
  });
});
