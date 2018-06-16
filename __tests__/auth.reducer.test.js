import * as actions from '../src/actions/auth.actions';
import auth from '../src/reducers/auth';
import * as types from '../src/types';

describe('auth reducer', () => {
  const initialState = {
    signedIn: false,
    user: null,
    userConfirmed: null,
  };

  test('receiving action SIGN_IN_FAILURE', () => {
    const action = actions.signInFailure('oh no');
    expect(auth(initialState, action)).toEqual({
      signedIn: false,
      user: null,
      userConfirmed: null,
    });
  });
  
  test('receiving action SIGN_IN_SUCCESS', () => {
    const action = actions.signInSuccess({
      username: 'harriet',
      emailVerified: true,
    });
    expect(auth(initialState, action)).toEqual({
      signedIn: true,
      user: {
        username: 'harriet',
        emailVerified: true,
      },
      userConfirmed: true,
    });
  });

  test('receiving action CHECK_AUTHENTICATED_USER_SUCCESS', () => {
    const action = actions.checkForAuthenticatedUserSuccess({
      username: 'harriet',
      emailVerified: true,
    });
    expect(auth(initialState, action)).toEqual({
      signedIn: true,
      user: {
        username: 'harriet',
        emailVerified: true,
      },
      userConfirmed: true,
    });
  });

  test('receiving action GET_USER_CREDENTIALS_SUCCESS', () => {
    const s = {
      ...initialState,
      signedIn: true,
      user: {
        username: 'harriet',
      }
    };
    const action = actions.getUserCredentialsSuccess({
      token: '123',
    });
    expect(auth(s, action)).toEqual({
      signedIn: true,
      user: {
        username: 'harriet',
        credentials: {
          token: '123',
        }
      },
      userConfirmed: null,
    });
  });

  test('receiving action SIGN_UP_REQUEST', () => {
    const action = {type: types.SIGN_UP_REQUEST};
    expect(auth(initialState, action)).toEqual({
      signedIn: false,
      user: null,
      userConfirmed: null,
    });
  });

  test('receiving action SIGN_UP_SUCCESS', () => {
    const action = actions.signUpSuccess({username: 'harriet'});
    expect(auth(initialState, action)).toEqual({
      signedIn: false,
      user: {
        username: 'harriet',
      },
      userConfirmed: false,
    });
  });
  
  test('receiving action SIGN_UP_FAILURE', () => {
    const action = actions.signUpFailure('oh no');
    expect(auth(initialState, action)).toEqual({
      signedIn: false,
      user: null,
      userConfirmed: null,
    });
  });
  
  test('receiving action CHECK_AUTHENTICATED_USER_SUCCESS', () => {
    const action = actions.checkForAuthenticatedUserSuccess({
      username: 'hat',
      emailVerified: true,
    });
    expect(auth(initialState, action)).toEqual({
      signedIn: true,
      user: {
        username: 'hat',
        emailVerified: true,
      },
      userConfirmed: true,
    });
  });

  test('receiving action CHECK_AUTHENTICATED_USER_FAILURE', () => {
    const action = { type: types.CHECK_AUTHENTICATED_USER_FAILURE };
    expect(auth(initialState, action)).toEqual({
      signedIn: false,
      user: null,
      userConfirmed: null,
    });
  });

  test('receiving action SIGN_OUT_SUCCESS', () => {
    const action1 = actions.signUpSuccess({username: 'harriet'});
    const state2 = auth(initialState, action1);
    const action2 = {type: types.SIGN_OUT_SUCCESS};
    const state3 = auth(state2, action2);

    expect(state3).toEqual({
      signedIn: false,
      user: null,
      userConfirmed: null,
    });
  });

  test('receiving action CONFIRM_USER_ONLY', () => {
    const action = { type: types.CONFIRM_USER_ONLY };
    expect(auth(initialState, action)).toEqual({
      signedIn: false,
      user: null,
      userConfirmed: true,
    });
  });
  
  test('receiving action CONFIRM_SIGNUP_SUCCESS', () => {
    const action = { type: types.CONFIRM_SIGNUP_SUCCESS };
    expect(auth(initialState, action)).toEqual({
      signedIn: true,
      user: null,
      userConfirmed: null,
    });
  });
 
  test('receiving action CONFIRM_SIGNUP_FAILURE', () => {
    const action = { type: types.CONFIRM_SIGNUP_FAILURE };
    expect(auth(initialState, action)).toEqual({
      signedIn: false,
      user: null,
      userConfirmed: null,
    });
  });

 
  
  // test('receiving action CONFIRM_SIGNUP_SUCCESS', () => {
  //   const action = {type: types.CONFIRM_SIGNUP_SUCCESS};
  //   expect(auth(initialState, action)).toEqual({
  //     signedIn: true,
  //     loading: false,
  //     awaitingConfirmation: false,
  //     error: null,
  //     user: null,
  //   });
  // });
  
  // test('receiving action CONFIRM_SIGNUP_FAILURE', () => {
  //   const action = actions.confirmSignUpFailure('oh no');
  //   expect(auth(initialState, action)).toEqual({
  //     signedIn: false,
  //     loading: false,
  //     awaitingConfirmation: true,
  //     error: 'oh no',
  //     user: null,
  //   });
  // });

});