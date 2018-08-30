/* eslint-disable no-console */
import * as types from '../types';
import { API_ROOT } from 'react-native-dotenv';

export const updateProfile = (profile, idToken) => {
  return (dispatch) => {
    dispatch(updateProfileRequest());
    return fetch(`${API_ROOT}/users/${profile.userId}`, {
      method: 'PUT',
      headers: {
        Authorization: idToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(profile)
    })
      .then(res => res.json())
      .then(({user}) => {
        dispatch(updateProfileSuccess(user));
      })
      .catch(err => {
        console.log('Error saving user profile', err);
        dispatch(updateProfileFailure());
      });
  };
};

export const updateProfileRequest = () => ({
  type: types.UPDATE_PROFILE_REQUEST,
});

export const updateProfileSuccess = (user) => ({
  type: types.UPDATE_PROFILE_SUCCESS,
  payload: user,
});

export const updateProfileFailure = () => ({
  type: types.UPDATE_PROFILE_FAILURE,
});
