import * as actions from '../src/actions/auth.actions';
import signUp from '../src/reducers/signUp';

describe('signUp reducer', () => {
  const initialState = {
    error: null,
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    loading: false
  };

  test('receiving action SIGN_UP_REQUEST', () => {
    const action = actions.signUpRequest();
    expect(signUp(initialState, action)).toEqual({
      error: null,
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      loading: true,
    });
  });

  test('receiving action SIGN_UP_SUCCESS', () => {
    const action = actions.signUpSuccess({username: 'harrietty'});
    expect(signUp(initialState, action)).toEqual({
      error: null,
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      loading: false,
    });
  });

  test('receiving action SIGN_UP_FAILURE', () => {
    const action = actions.signUpFailure('oh no');
    expect(signUp(initialState, action)).toEqual({
      error: 'oh no',
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      loading: false,
    });
  });

  test('receiving action UPDATE_SIGNUP_FORM', () => {
    const action = actions.updateSignUpForm('password', 'foo');
    expect(signUp(initialState, action)).toEqual({
      error: null,
      email: '',
      username: '',
      password: 'foo',
      confirmPassword: '',
      loading: false,
    });
  });
  
  test('receiving action CONFIRM_SIGNUP_SUCCESS', () => {
    let action = actions.updateSignUpForm('password', 'foo');
    let s1 = signUp(initialState, action);
    expect(s1.password).toBe('foo');
    action = actions.confirmSignUpSuccess();
    expect(signUp(s1, action)).toEqual({
      error: null,
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      loading: false,
    });
  });
  
  test('receiving action CONFIRM_SIGNUP_FAILURE', () => {
    let action = actions.updateSignUpForm('password', 'foo');
    let s1 = signUp(initialState, action);
    expect(s1.password).toBe('foo');
    action = actions.confirmSignUpFailure();
    expect(signUp(s1, action)).toEqual({
      error: null,
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      loading: false,
    });
  });

  test('receiving action CREATE_SIGNUP_ERROR', () => {
    const action = actions.createSignUpError('oh no');
    expect(signUp(initialState, action)).toEqual({
      error: 'oh no',
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      loading: false,
    });
  });
  
  test('receiving action CLEAR_SIGNUP_ERROR', () => {
    let action = actions.createSignUpError('oh no');
    const s = signUp(initialState, action);
    action = actions.clearSignUpError();
    expect(signUp(s, action)).toEqual({
      error: null,
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      loading: false,
    });
  });
});