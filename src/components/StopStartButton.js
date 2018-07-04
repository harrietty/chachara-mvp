import PropTypes from 'prop-types';
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class StopStartButton extends React.Component {
  render () {
    const {recording, finished, beginRecording, pauseRecording, hasStarted, continueRecording} = this.props;
    let action;
    if (!hasStarted) action = beginRecording;
    else if (hasStarted && recording) action = pauseRecording;
    else if (hasStarted && !recording) action = continueRecording;
    return (
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity style={{width: 100, height: 100, alignItems: 'center', justifyContent: 'center'}} onPress={action}>
          {recording && <Icon name='circle' size={50} color='#DE122F' />}
          {(!recording && !finished) && <Icon name='microphone' size={50} color='#5E4B4D' />}
        </TouchableOpacity>
      </View>
    );
  }

  static propTypes = {
    beginRecording: PropTypes.func.isRequired,
    continueRecording: PropTypes.func.isRequired,
    pauseRecording: PropTypes.func.isRequired,
    recording: PropTypes.bool.isRequired,
    hasStarted: PropTypes.bool.isRequired,
    finished: PropTypes.bool.isRequired
  }
}