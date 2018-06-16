import React from 'react';
import { Text, View } from 'react-native';
import common from '../styles/common';

export default class UserProfile extends React.Component {
  static navigationOptions () {
    return {
      title: 'Recordings'
    };
  }

  render () {
    return (
      <View style={common.container}>
        <View style={common.inAppHeaderArea}>
          <Text style={common.header}>My Recordings</Text>
        </View>
        <View style={common.mainArea}>
          <Text style={common.text}>Previous recordings you've made in answer to questions.</Text>
        </View>
      </View>
    );
  }
}
