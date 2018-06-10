import * as actions from '../src/actions';
import auth from '../src/reducers/auth';

describe('reducers', () => {
  describe('auth reducer', () => {

    const initialState = {
      signedIn: false,
      loading: false,
      awaitingConfirmation: false,
      error: null,
      user: null
    };

    test('receiving action SIGN_UP_REQUEST', () => {
      const action = actions.signUpRequest();
      expect(auth(initialState, action)).toEqual({
        signedIn: false,
        loading: true,
        awaitingConfirmation: false,
        error: null,
        user: null
      });
    });

    test('receiving action SIGN_UP_SUCCESS', () => {
      const action = actions.signUpSuccess({username: 'harriet'});
      expect(auth(initialState, action)).toEqual({
        signedIn: false,
        loading: false,
        awaitingConfirmation: true,
        error: null,
        user: {username: 'harriet'}
      });
    });
    
    test('receiving action SIGN_UP_FAILURE', () => {
      const action = actions.signUpFailure('oh no');
      expect(auth(initialState, action)).toEqual({
        signedIn: false,
        loading: false,
        awaitingConfirmation: false,
        error: 'oh no',
        user: null
      });
    });
    
    test('receiving action CONFIRM_SIGNUP_SUCCESS', () => {
      const action = actions.confirmSignUpSuccess();
      expect(auth(initialState, action)).toEqual({
        signedIn: true,
        loading: false,
        awaitingConfirmation: false,
        error: null,
        user: null
      });
    });
    
    test('receiving action CONFIRM_SIGNUP_FAILURE', () => {
      const action = actions.confirmSignUpFailure('oh no');
      expect(auth(initialState, action)).toEqual({
        signedIn: false,
        loading: false,
        awaitingConfirmation: true,
        error: 'oh no',
        user: null
      });
    });
  });
});