import * as actions from '../src/actions/auth.actions';
import signIn from '../src/reducers/signIn';
import * as types from '../src/types';

describe('signIn reducer', () => {
  const initialState = {
    error: null,
    username: '',
    password: '',
    loading: false,
  };
  test('receiving action UPDATE_SIGNIN_FORM', () => {
    const action = actions.updateSignInForm('username', 'foo');
    expect(signIn(initialState, action)).toEqual({
      error: null,
      username: 'foo',
      password: '',
      loading: false,
    });

    const action2 = actions.updateSignInForm('password', 'bar');
    expect(signIn(initialState, action2)).toEqual({
      error: null,
      username: '',
      password: 'bar',
      loading: false,
    });
  });

  test('receiving action SIGN_IN_REQUEST', () => {
    const action = {type: types.SIGN_IN_REQUEST};
    expect(signIn(initialState, action)).toEqual({
      error: null,
      username: '',
      password: '',
      loading: true,
    });
  });

  test('receiving action SIGN_IN_FAILURE', () => {
    const action = actions.signInFailure('oh no');
    expect(signIn(initialState, action)).toEqual({
      error: 'oh no',
      username: '',
      password: '',
      loading: false,
    });
  });

  test('receiving action CONFIRM_SIGNUP_FAILURE', () => {
    const action = actions.confirmSignUpFailure();
    expect(signIn(initialState, action)).toEqual({
      error: null,
      username: '',
      password: '',
      loading: false,
    });
  });
  
  test('receiving action CONFIRM_SIGNUP_SUCCESS', () => {
    const action = actions.confirmSignUpSuccess();
    expect(signIn(initialState, action)).toEqual({
      error: null,
      username: '',
      password: '',
      loading: false,
    });
  });

  test('receiving action CREATE_SIGNIN_ERROR', () => {
    const action = actions.createSignInError('oh no');
    expect(signIn(initialState, action)).toEqual({
      error: 'oh no',
      username: '',
      password: '',
      loading: false,
    });
  });

  test('receiving action CLEAR_SIGNIN_ERROR', () => {
    const action = actions.signInFailure('oh no');
    const s2 = signIn(initialState, action);
    expect(s2.error).toBe('oh no');
    const action2 = actions.clearSignInError();
    expect(signIn(s2, action2)).toEqual({
      error: null,
      username: '',
      password: '',
      loading: false,
    });
  });
  
  test('receiving action GET_USER_CREDENTIALS_REQUEST', () => {
    const action = { type: types.GET_USER_CREDENTIALS_REQUEST };
    expect(signIn(initialState, action)).toEqual({
      error: null,
      username: '',
      password: '',
      loading: true,
    });
  });
  
  test('receiving action GET_USER_CREDENTIALS_SUCCESS', () => {
    let action = { type: types.GET_USER_CREDENTIALS_REQUEST };
    const s = signIn(initialState, action);
    action = { type: types.GET_USER_CREDENTIALS_SUCCESS };
    expect(signIn(s, action)).toEqual({
      error: null,
      username: '',
      password: '',
      loading: false,
    });
  });

  test('receiving action CHECK_AUTHENTICATED_USER_REQUEST', () => {
    const action = { type: types.CHECK_AUTHENTICATED_USER_REQUEST };
    expect(signIn(initialState, action)).toEqual({
      error: null,
      username: '',
      password: '',
      loading: true,
    });
  });
  
  test('receiving action CHECK_AUTHENTICATED_USER_SUCCESS', () => {
    let action = { type: types.CHECK_AUTHENTICATED_USER_REQUEST };
    let s = signIn(initialState, action);
    expect(s).toEqual({
      error: null,
      username: '',
      password: '',
      loading: true,
    });
    action = { type: types.CHECK_AUTHENTICATED_USER_SUCCESS };
    expect(signIn(s, action)).toEqual({
      error: null,
      username: '',
      password: '',
      loading: false,
    });
  });
  
  test('receiving action CHECK_AUTHENTICATED_USER_FAILURE', () => {
    const action = { type: types.CHECK_AUTHENTICATED_USER_FAILURE };
    expect(signIn(initialState, action)).toEqual({
      error: null,
      username: '',
      password: '',
      loading: false,
    });
  });
});