import PropTypes from 'prop-types';
import { Audio } from 'expo';
import React from 'react';
import { View, Text } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import StopStartButton from './StopStartButton';

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
    sound: null,
    isPlaying: false,
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
    await this.setMostRecentRecordingSound();
  }

  setMostRecentRecordingSound = async () => {
    const {
      sound
    } = await this.recording.createNewLoadedSound({
      isLooping: false,
      isMuted: false,
      volume: 1.0,
      rate: 1.0
    }, (status) => {
      if (status.didJustFinish) {
        this.state.sound.setPositionAsync(0);
        this.setState({
          isPlaying: false
        });
      }
    });
    this.setState({
      sound
    });
  }

  playPauseSound = async () => {
    if (!this.state.sound) {
      await this.setMostRecentRecordingSound();
    }
    const { isPlaying, sound } = this.state;
    if (isPlaying) {
      sound.pauseAsync();
      this.setState({
        isPlaying: false
      });
    } else {
      sound.playAsync();
      this.setState({
        isPlaying: true
      });
    }
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
              hasStarted={this.state.time > 0}
              beginRecording={this.beginRecording}
              continueRecording={this.continueRecording}
              pauseRecording={this.pauseRecording}
              recording={this.state.recording}
              finished={this.state.finished}
              playSound={this.playPauseSound}
              isPlaying={this.state.isPlaying}
            />
          )}
        </AnimatedCircularProgress>
        {this.state.time > 0 && <Text style={styles.startAgain}>Start again</Text>}
      </View>
    );
  }

  static propTypes = {
    disableButtons: PropTypes.func.isRequired,
    selectedTime: PropTypes.number.isRequired
  }
}