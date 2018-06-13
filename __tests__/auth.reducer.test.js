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
        signedIn: true,
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

    test('receiving action SIGN_OUT_REQUEST', () => {
      const action1 = actions.signUpSuccess({username: 'harriet'});
      const state2 = auth(initialState, action1);
      const action2 = actions.signOutRequest();
      const state3 = auth(state2, action2);

      expect(state3).toEqual({
        signedIn: true,
        loading: true,
        awaitingConfirmation: true,
        error: null,
        user: {username: 'harriet'}
      });
    });

    test('receiving action SIGN_OUT_SUCCESS', () => {
      const action1 = actions.signUpSuccess({username: 'harriet'});
      const state2 = auth(initialState, action1);
      const action2 = actions.signOutSuccess();
      const state3 = auth(state2, action2);

      expect(state3).toEqual({
        signedIn: false,
        loading: false,
        awaitingConfirmation: false,
        error: null,
        user: null,
      });
    });

    test('receiving action SIGN_OUT_FAILURE', () => {
      const action1 = actions.signUpSuccess({username: 'harriet'});
      const state2 = auth(initialState, action1);
      const action2 = actions.signOutFailure('oh no');
      const state3 = auth(state2, action2);

      expect(state3).toEqual({
        signedIn: true,
        loading: false,
        awaitingConfirmation: true,
        error: 'oh no',
        user: {username: 'harriet'},
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