import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import StopStartButton from './StopStartButton';

import styles from '../../styles/recordingArea';

export default class RecordingProgressIndicator extends React.Component {
  render () {
    return (
      <View style={styles.container}>
        <AnimatedCircularProgress
          size={220}
          width={10}
          prefill={0}
          fill={this.props.currentRecordingProgress}
          tintColor="#FFA600"
          rotation={0}
          linecap="round"
          backgroundColor="#C9C7C8">
          {() => (
            <StopStartButton
              continueRecording={this.props.continueRecording}
              pauseRecording={this.props.pauseRecording}
              isRecording={this.props.isRecording}
              finished={this.props.finished}
            />
          )}
        </AnimatedCircularProgress>
      </View>
    );
  }

  static propTypes = {
    continueRecording: PropTypes.func.isRequired,
    pauseRecording: PropTypes.func.isRequired,
    isRecording: PropTypes.bool.isRequired,
    finished: PropTypes.bool.isRequired,
    currentRecordingProgress: PropTypes.number.isRequired,
  }
}