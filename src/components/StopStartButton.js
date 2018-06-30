import PropTypes from 'prop-types';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class StopStartButton extends React.Component {
  render () {
    const {recording, beginRecording, pauseRecording} = this.props;
    return (
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity style={{width: 100, height: 100, alignItems: 'center', justifyContent: 'center'}} onPress={recording ? pauseRecording : beginRecording}>
          <Icon name={recording ? 'stop' : 'microphone'} size={50} color={'#5E4B4D'} />
        </TouchableOpacity>
      </View>
    );
  }

  static propTypes = {
    beginRecording: PropTypes.func.isRequired,
    pauseRecording: PropTypes.func.isRequired,
    recording: PropTypes.bool.isRequired,
  }
}