import PropTypes from 'prop-types';
import React from 'react';
import { View, ImageBackground, Text } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import StopStartButton from './StopStartButton';

import styles from '../styles/recordingArea';

export default class RecordingArea extends React.Component {
  state = {
    time: 0,
    recording: false
  }
  // componentDidMount () {
  //   setInterval(() => {
  //     this.setState({
  //       time: this.state.time + 1
  //     });
  //   }, 1000);
  // }

  beginRecording = () => {
    this.props.disableButtons();
    this.setState({
      recording: true
    });
  }

  pauseRecording = () => {
    console.log('pausing')
    this.setState({
      recording: false
    });
  }

  render () {
    const percentRemaining = 100 - (this.state.time / 120 * 100);
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
              beginRecording={this.beginRecording}
              pauseRecording={this.pauseRecording}
              recording={this.state.recording}
            />
          )}
        </AnimatedCircularProgress>
      </View>
    );
  }

  static propTypes = {
    disableButtons: PropTypes.func.isRequired,
  }
}