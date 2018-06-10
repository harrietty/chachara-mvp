import Amplify, { Auth } from 'aws-amplify';
import awsExports from './aws-exports';
import * as types from './types';

Amplify.configure(awsExports);

export const signUpRequest = () => ({
  type: types.SIGN_UP_REQUEST
});

export const signUpSuccess = (user) => ({
  type: types.SIGN_UP_SUCCESS,
  payload: user
});

export const signUpFailure = (err) => ({
  type: types.SIGN_UP_FAILURE,
  payload: err
});

export const signUp = (email, password, username) => {
  return (dispatch) => {
    dispatch(signUpRequest())
    return Auth.signUp({ username, password, attributes: { email } })
      .then(({ user }) => {
        dispatch(signUpSuccess(user));
      })
      .catch((err) => {
        dispatch(signUpFailure(err.message))
      });
  }
}

export const confirmSignUpSuccess = () => ({
  type: types.CONFIRM_SIGNUP_SUCCESS
});

export const confirmSignUpFailure = (err) => ({
  type: types.CONFIRM_SIGNUP_FAILURE,
  payload: err
});

export const confirmSignUp = (username, code) => {
  return (dispatch) => {
    return Auth.confirmSignUp(username, code)
      .then((res) => {
        dispatch(confirmSignUpSuccess())
      })
      .catch((err) => {
        dispatch(confirmSignUpFailure(err.message));
      });
  }
};

const signIn = (user) => {
  return {
    type: types.SIGN_IN,
    payload: user
  };
};

const signOut = () => {
  return {
    type: types.SIGN_OUT
  };
};

export const currentAuthenticatedUser = () => {
  return (dispatch) => {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        dispatch(signIn(user))
      })
      .catch((err) => {
        dispatch(signOut());
      });
  }
}