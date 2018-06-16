import { Auth } from 'aws-amplify';
import * as types from '../types';

export const signUp = (email, password, username) => {
  return (dispatch) => {
    dispatch(signUpRequest());
    return Auth.signUp({ username, password, attributes: { email } })
      .then(({ user: cognitoUser }) => {
        const user = {
          username: cognitoUser.username
        };
        dispatch(signUpSuccess(user));
      })
      .catch((err) => {
        dispatch(signUpFailure(err.message));
      });
  };
};

export const signUpRequest = () => ({
  type: types.SIGN_UP_REQUEST,
});

export const signUpSuccess = (user) => ({
  type: types.SIGN_UP_SUCCESS,
  payload: user,
});

export const signUpFailure = (err) => ({
  type: types.SIGN_UP_FAILURE,
  payload: err,
});

export const updateSignUpForm = (key, value) => ({
  type: types.UPDATE_SIGNUP_FORM,
  payload: {
    key, value
  }
});

export const createSignUpError = (err) => {
  return {
    type: types.CREATE_SIGNUP_ERROR,
    payload: err,
  };
};

export const signOut = () => {
  return (dispatch) => {
    dispatch({ type: types.SIGN_OUT_REQUEST });

    return Auth.signOut()
      .then(() => dispatch({ type: types.SIGN_OUT_SUCCESS }))
      .catch((err) => {
        dispatch(signOutFailure(err.message));
      });
  };
};

export const signOutFailure = (err) => {
  return {
    type: types.SIGN_OUT_FAILURE,
    payload: err,
  };
};

export const signIn = (username, password) => {
  return (dispatch) => {
    dispatch({ type: types.SIGN_IN_REQUEST });
    return Auth.signIn(username, password)
      .then((cognitoUser) => {
        const user = cleanUpCognitoUser(cognitoUser);
        dispatch(signInSuccess(user));
      })
      .then(() => dispatch(getUserCredentials()))
      .catch((err) => {
        if (err.code === 'UserNotConfirmedException') {
          dispatch(signUpSuccess({username}));
        } else {
          dispatch(signInFailure('Username or password incorrect'));
        }
      });
  };
};

export const signInSuccess = (user) => {
  return {
    type: types.SIGN_IN_SUCCESS,
    payload: user,
  };
};

export const signInFailure = (err) => {
  return {
    type: types.SIGN_IN_FAILURE,
    payload: err,
  };
};

export const updateSignInForm = (key, value) => ({
  type: types.UPDATE_SIGNIN_FORM,
  payload: {
    key, value
  }
});

export const createSignInError = (err) => {
  return {
    type: types.CREATE_SIGNIN_ERROR,
    payload: err,
  };
};

export const checkForAuthenticatedUser = () => {
  return (dispatch) => {
    dispatch({ type: types.CHECK_AUTHENTICATED_USER_REQUEST });
    return Auth.currentAuthenticatedUser()
      .then((cognitoUser) => {
        const user = cleanUpCognitoUser(cognitoUser);
        dispatch(checkForAuthenticatedUserSuccess(user));
      })
      .then(() => dispatch(getUserCredentials()))
      .catch(() => {
        dispatch({type: types.CHECK_AUTHENTICATED_USER_FAILURE});
      });
  };
};

export const checkForAuthenticatedUserSuccess = (user) => ({
  type: types.CHECK_AUTHENTICATED_USER_SUCCESS,
  payload: user,
});

export const getUserCredentialsSuccess = (credentials) => ({
  type: types.GET_USER_CREDENTIALS_SUCCESS,
  payload: credentials
});

export const getUserCredentials = () => {
  return (dispatch) => {
    dispatch({ type: types.GET_USER_CREDENTIALS_REQUEST });
    Auth.currentCredentials()
      .then((credentials) => {
        credentials = Auth.essentialCredentials(credentials);
        dispatch(getUserCredentialsSuccess(credentials));
      })
      .catch((err) => {
        dispatch({
          types: types.GET_USER_CREDENTIALS_FAILURE,
          payload: err
        });
      });
  };
};

export const confirmSignUp = (username, code, password) => {
  return (dispatch) => {
    dispatch(confirmSignUpRequest());
    return Auth.confirmSignUp(username, code)
      .catch((err) => {
        // reject to be caught at the end
        return Promise.reject(err);
      })
      .then(() => {
        dispatch({type: types.CONFIRM_USER_ONLY});
        return Auth.signIn(username, password);
      })
      .then(() => {
        return checkForAuthenticatedUser();
      })
      .then(() => {
        dispatch(confirmSignUpSuccess());
      })
      .catch(err => {
        let msg = err.message || 'Something went wrong';
        dispatch(confirmSignUpFailure(msg));
      });
  };
};

export const confirmSignUpRequest = () => {
  return {
    type: types.CONFIRM_SIGNUP_REQUEST,
  };
};

export const confirmSignUpSuccess = () => {
  return {
    type: types.CONFIRM_SIGNUP_SUCCESS,
  };
};

export const confirmSignUpFailure = (err) => {
  return {
    type: types.CONFIRM_SIGNUP_FAILURE,
    payload: err,
  };
};

export const updateConfirmForm = (key, value) => ({
  type: types.UPDATE_CONFIRM_FORM,
  payload: {
    key, value
  }
});

function cleanUpCognitoUser (user) {
  const { payload: details, jwtToken } = user.signInUserSession.idToken;
  return {
    email: details.email,
    username: user.username,
    id: details.sub,
    idToken: jwtToken,
    emailVerified: details.email_verified
  };
}

export const clearSignInError = () => ({
  type: types.CLEAR_SIGNIN_ERROR,
});

export const clearSignUpError = () => ({
  type: types.CLEAR_SIGNUP_ERROR,
});

export const clearConfirmError = () => ({
  type: types.CLEAR_CONFIRMATION_ERROR,
});
