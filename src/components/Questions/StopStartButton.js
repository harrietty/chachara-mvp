import PropTypes from 'prop-types';
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class StopStartButton extends React.Component {
  render () {
    const {isRecording, finished, pauseRecording, continueRecording} = this.props;
    let action = isRecording ? pauseRecording : continueRecording;
    return (
      <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
        <View style={{width: 50, height: 80, alignItems: 'center', justifyContent: 'center'}}>
          <Icon name='circle' size={40} color={isRecording ? '#DE122F' : '#CCC4C5'} />
        </View>
        <TouchableOpacity style={{width: 50, height: 80, alignItems: 'center', justifyContent: 'center'}} onPress={action}>
          {(!isRecording && !finished) && <Icon name='microphone' size={40} color='#5E4B4D' />}
          {isRecording && <Icon name='pause' size={40} color='#5E4B4D' />}
        </TouchableOpacity>
      </View>
    );
  }

  static propTypes = {
    continueRecording: PropTypes.func.isRequired,
    pauseRecording: PropTypes.func.isRequired,
    isRecording: PropTypes.bool.isRequired,
    finished: PropTypes.bool.isRequired
  }
}