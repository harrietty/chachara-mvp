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

export const signIn = (username, password) => {
  return (dispatch) => {
    dispatch(signInRequest());
    return Auth.signIn(username, password)
      .then((res) => {
        // TODO: decide how to use this
        const token = res.signInUserSession.accessToken.jwtToken;
        const user = res.signInUserSession.idToken.payload;
        const awaitingConfirmation = !user.email_verified;
        dispatch(signInSuccess(user, awaitingConfirmation));
      })
      .catch((err) => {
        console.log(err);
        dispatch(signInFailure(err.message));
      })
  };
};

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

const signInSuccess = (user, confirmed) => {
  return {
    type: types.SIGN_IN_SUCCESS,
    payload: {
      user, confirmed
    }
  };
};

const signInFailure = (err) => {
  return {
    type: types.SIGN_IN_FAILURE,
    payload: user
  };
};

const signInRequest = () => {
  return {
    type: types.SIGN_IN_REQUEST,
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