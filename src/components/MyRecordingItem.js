import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Text, View, TouchableOpacity } from 'react-native';

export default class MyRecordingItem extends React.Component {
  render () {
    const { recording, user } = this.props;
    return (
      <View style={{flexDirection: 'row', alignItems: 'center', paddingLeft: 15, paddingRight: 15}}>
        <Text style={{fontFamily: 'AvenirNext-Regular', textAlign: 'left', marginBottom: 20, fontSize: 22, flex: 4}}>
          {recording.question.text}
        </Text>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{fontFamily: 'AvenirNext-Regular', textAlign: 'right', marginBottom: 20, fontSize: 16}}>
            ({Math.round(recording.length_millis / 1000)} s)
          </Text>
          <TouchableOpacity 
            onPress={() => this.props.deleteFromS3(recording.url, recording._id, user)}
          >
            <Icon name='trash' size={25} color='grey' />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  static propTypes = {
    recording: PropTypes.object.isRequired,
    deleteFromS3: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
  }
}
