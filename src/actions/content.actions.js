import { Storage } from 'aws-amplify';
import { AsyncStorage } from 'react-native';
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
    dispatch(fetchQuestionsRequest());
    return fetch(`https://e086imwdd1.execute-api.eu-west-1.amazonaws.com/latest/languages/${LANG}/questions`)
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
      .catch(() => {
        dispatch(fetchQuestionsError('Could not load questions'));
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

export const uploadToS3 = (buf) => {
  console.log('uploading');
  return (dispatch) => {
    dispatch(uploadToS3Request());
    return Storage.put('somefile.caf', buf)
      .then(res => {
        dispatch(uploadToS3Success());
        // return loadAudio();
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

export const uploadToS3Success = () => ({
  type: types.UPLOAD_TO_S3_SUCCESS,
});

export const uploadToS3Failure = () => ({
  type: types.UPLOAD_TO_S3_FAILURE,
});
