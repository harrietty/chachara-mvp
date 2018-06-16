import Amplify, { Auth } from 'aws-amplify';
import awsExports from './aws-exports';
import * as types from './types';

Amplify.configure(awsExports);

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

export const signOut = () => {
  return (dispatch) => {
    dispatch(signOutRequest());
    return Auth.signOut()
      .then(() => {
        dispatch(signOutSuccess());
      })
      .catch((err) => {
        dispatch(signOutFailure(err));
      });
  };
}

export const signOutRequest = () => ({
  type: types.SIGN_OUT_REQUEST
});

export const signOutSuccess = () => ({
  type: types.SIGN_OUT_SUCCESS,
});

export const signOutFailure = (err) => ({
  type: types.SIGN_OUT_FAILURE,
  payload: err
});

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
        dispatch(signInFailure(err.message));
      })
  };
};

export const signInRequest = () => {
  return {
    type: types.SIGN_IN_REQUEST,
  };
};

export const signInSuccess = (user, confirmed) => {
  return {
    type: types.SIGN_IN_SUCCESS,
    payload: {
      user, confirmed
    }
  };
};

export const signInFailure = (err) => {
  return {
    type: types.SIGN_IN_FAILURE,
    payload: err
  };
};

export const checkForAuthenticatedUser = () => {
  return (dispatch) => {
    dispatch(signInRequest());
    Auth.currentAuthenticatedUser()
    .then((user) => {
      dispatch(signInSuccess(user))
    })
    .catch((err) => {
      console.log(err);
      // TODO: handle
    });
  }
}

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

export const confirmSignUpSuccess = () => ({
  type: types.CONFIRM_SIGNUP_SUCCESS
});

export const confirmSignUpFailure = (err) => ({
  type: types.CONFIRM_SIGNUP_FAILURE,
  payload: err
});