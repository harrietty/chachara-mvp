import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';

export default class MyRecordingItem extends React.Component {
  render () {
    const {recording} = this.props;
    return (
      <View style={{flexDirection: 'row', alignItems: 'center', paddingLeft: 15, paddingRight: 15}}>
        <Text style={{fontFamily: 'AvenirNext-Regular', textAlign: 'left', marginBottom: 20, fontSize: 22, flex: 4}}>
          {recording.question.text}
        </Text>
        <Text style={{fontFamily: 'AvenirNext-Regular', textAlign: 'right', marginBottom: 20, fontSize: 16, flex: 1}}>
          ({Math.round(recording.length_millis / 1000)} s)
        </Text>
      </View>
    );
  }

  static propTypes = {
    recording: PropTypes.object.isRequired
  }
}
