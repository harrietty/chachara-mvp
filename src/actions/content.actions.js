import { Storage } from 'aws-amplify';
import * as types from '../types';

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


export const uploadToS3 = (buf) => {
  return (dispatch) => {
    return Storage.put('main4.caf', buf)
      .then(res => {
        // return loadAudio();
      })
      .catch(console.log);
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
