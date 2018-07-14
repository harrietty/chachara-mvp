/* eslint-disable no-console */
import { API_ROOT, ENVIRONMENT } from 'react-native-dotenv';
import { Storage } from 'aws-amplify';
import { AsyncStorage } from 'react-native';
import { FileSystem } from 'expo';
import * as types from '../types';

import userConfig from '../user-config';

import Expo from 'expo';

export async function loadAudio(uri) {
  const soundObject = new Expo.Audio.Sound();
  try {
    await soundObject.loadAsync({uri: uri});
    await soundObject.playAsync();
    // Your sound is playing!
  } catch (error) {
    // An error occurred!
    console.log(error);
  }
}

export async function downloadAudioFile(sourceUri, destinationUri) {
  // return await Expo.FileSystem.downloadAsync(sourceUri, destinationUri);
  Storage.get('main3.caf')
    .then(res => {
      console.log({res});
      loadAudio(res);
    })
    .catch(console.log);
}

export const fetchQuestions = () => {
  const {LANG} = userConfig;
  return dispatch => {
    console.log('fetching from network');
    dispatch(fetchQuestionsRequest());
    return fetch(`${API_ROOT}/languages/${LANG}/questions`)
      .then(res => res.json())
      .then(({questions}) => {
        dispatch(fetchQuestionsSuccess(questions));
        return questions;
      })
      .then(questions => {
        return AsyncStorage.setItem(`QUESTIONS-${LANG}`, JSON.stringify({
          questions,
          time: new Date().getTime()
        }));
      })
      .catch((err) => {
        if (err && err.message === 'Network request failed') {
          ENVIRONMENT === 'development' ?
            dispatch(fetchQuestionsError('No network connection. Is the local API running?')) :
            dispatch(fetchQuestionsError('Unable to load questions - no network connection.'));
        }
      });
  };
};

export const getQuestionsFromStorage = () => {
  const {LANG} = userConfig;
  return dispatch => {
    dispatch(fetchQuestionsRequest());
    return AsyncStorage.getItem(`QUESTIONS-${LANG}`)
      .then(questions => {
        dispatch(fetchQuestionsSuccess(JSON.parse(questions).questions));
      })
      .catch(() => {
        fetchQuestionsError('Could not load questions');
      });
  };
};

export const fetchQuestionsRequest = () => ({
  type: types.FETCH_QUESTIONS_REQUEST
});

export const fetchQuestionsSuccess = (questions) => ({
  type: types.FETCH_QUESTIONS_SUCCESS,
  payload: questions
});

export const fetchQuestionsError = (err) => ({
  type: types.FETCH_QUESTIONS_FAILURE,
  payload: err
});

export const uploadToS3 = (buf, uri, user, questionId, length) => {
  return (dispatch) => {
    dispatch(uploadToS3Request());
    return Storage.put(`${user.username}-${new Date().getTime()}.caf`, buf)
      .then((res) => {
        console.log('Successfully uploaded file to S3');
        const filename = res.key;
        return fetch(`${API_ROOT}/users/${user.id}/recordings`, {
          method: 'POST',
          headers: {
            Authorization: user.idToken,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            url: filename,
            lengthMillis: length,
            language: userConfig.LANG,
            questionId: questionId
          })
        });
        // return loadAudio();
      })
      .then(res => res.json())
      .then((res) => {
        console.log('Recording saved to DB', res);
        if (!res.recording) return Promise.reject('Unable to save recording to DB');
        dispatch(uploadToS3Success(res.recording));
        return FileSystem.deleteAsync(uri);
      })
      .catch((err) => {
        console.log(err);
        dispatch(uploadToS3Failure());
      });
  };
};

export const uploadToS3Request = () => ({
  type: types.UPLOAD_TO_S3_REQUEST,
});

export const uploadToS3Success = (recording) => ({
  type: types.UPLOAD_TO_S3_SUCCESS,
  payload: recording
});

export const uploadToS3Failure = () => ({
  type: types.UPLOAD_TO_S3_FAILURE,
});

export const deleteFromS3 = (recordingFilename, recordingId, user) => {
  return (dispatch) => {
    dispatch(deleteFromS3Request());
    return Storage.remove(recordingFilename)
      .then(() => {
        return fetch(`${API_ROOT}/users/${user.id}/recordings/${recordingId}`, {
          method: 'DELETE',
          headers: {
            Authorization: user.idToken
          }
        });
      })
      .then(() => {
        dispatch(deleteFromS3Success(recordingId));
      })
      .catch(err => {
        console.log(err);
        dispatch(deleteFromS3Failure('Something went wrong'));
      });
  };
};

export const deleteFromS3Request = () => ({
  type: types.DELETE_FROM_S3_REQUEST
});

export const deleteFromS3Success = (recordingId) => ({
  type: types.DELETE_FROM_S3_SUCCESS,
  payload: recordingId
});

export const deleteFromS3Failure = (err) => ({
  type: types.DELETE_FROM_S3_FAILURE,
  payload: err
});

export const fetchUserRecordings = (user) => {
  return (dispatch) => {
    dispatch(fetchUserRecordingsRequest());
    return fetch(`${API_ROOT}/users/${user.id}/recordings`)
      .then(res => res.json())
      .then(res => {
        dispatch(fetchUserRecordingsSuccess((res.recordings || [])));
      })
      .catch(err => {
        if (err && err.message === 'Network request failed') {
          ENVIRONMENT === 'development' ?
            dispatch(fetchUserRecordingsFailure('No network connection. Is the local API running?')) :
            dispatch(fetchUserRecordingsFailure('Unable to load recordings - no network connection.'));
        }
      });
  };
};

export const fetchUserRecordingsRequest = () => ({
  type: types.FETCH_USER_RECORDINGS_REQUEST
});

export const fetchUserRecordingsSuccess = (recordings) => ({
  type: types.FETCH_USER_RECORDINGS_SUCCESS,
  payload: recordings
});

export const fetchUserRecordingsFailure = (err) => ({
  type: types.FETCH_USER_RECORDINGS_FAILURE,
  payload: err
});
