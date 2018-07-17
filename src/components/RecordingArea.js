import PropTypes from 'prop-types';
import { Audio } from 'expo';
import React from 'react';
import { View, Text } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import StopStartButton from './StopStartButton';
import Button from '../reusable/Button';

import styles from '../styles/recordingArea';

const getAudioConfig = (mode) => {
  return {
    'PLAYBACK': {
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      playsInSilentLockedModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX
    },
    'RECORDING': {
      allowsRecordingIOS: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      shouldDuckAndroid: true,
    }
  }[mode];
};

export default class RecordingArea extends React.Component {
  state = {
    time: 0,
    recording: false,
    intervalId: null,
    error: null,
    finished: false
  }

  constructor(props) {
    super(props);
    this.recording = null;
  }

  beginRecording = async () => {
    this.props.disableButtons();
    await this.startAudioRecorder();
    this.beginProgressCountdown();
  }

  beginProgressCountdown = () => {
    const intervalId = setInterval(() => {
      const newTime = this.state.time + 1;
      this.setState({
        time: newTime,
        recording: true
      });
      if (newTime >= this.props.selectedTime) {
        this.stopRecording();
      }
    }, 1000);

    this.setState({intervalId});
  }

  startAudioRecorder = async () => {
    await Audio.setAudioModeAsync(getAudioConfig('RECORDING'));
    this.recording = new Audio.Recording();
    try {
      await this.recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await this.recording.startAsync();
    } catch (error) {
      this.setState({
        error
      });
    }
  }

  stopRecording = async () => {
    clearInterval(this.state.intervalId);

    try {
      await this.recording.stopAndUnloadAsync();
    } catch (error) {
      this.setState({
        error
      });
    }

    this.setState({
      recording: false,
      intervalId: null,
      finished: true
    });
    
    await Audio.setAudioModeAsync(getAudioConfig('PLAYBACK'));
    this.props.moveToPlayback(this.recording);
  }

  pauseRecording = async () => {
    clearInterval(this.state.intervalId);
    await this.recording.pauseAsync();
    this.setState({
      recording: false,
      intervalId: null
    });
  }

  continueRecording = async () => {
    this.beginProgressCountdown();
    await this.recording.startAsync();
  }

  render () {
    const percentRemaining = 100 - (this.state.time / this.props.selectedTime * 100);
    return (
      <View style={styles.container}>
        <AnimatedCircularProgress
          size={220}
          width={20}
          prefill={100}
          fill={percentRemaining}
          tintColor="#B2646F"
          rotation={0}
          lineCap="round"
          backgroundColor="#F5E6E8">
          {() => (
            <StopStartButton
              hasStarted={this.props.hasStarted}
              beginRecording={this.beginRecording}
              continueRecording={this.continueRecording}
              pauseRecording={this.pauseRecording}
              recording={this.state.recording}
              finished={this.state.finished}
            />
          )}
        </AnimatedCircularProgress>
      </View>
    );
  }

  static propTypes = {
    hasStarted: PropTypes.bool.isRequired
  }
}