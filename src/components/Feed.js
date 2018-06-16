import React from 'react';
import { Text, View } from 'react-native';

import common from '../styles/common';

export default class Feed extends React.Component {
  static navigationOptions () {
    return {
      title: 'Feed',
    };
  }

  render () {
    return (
      <View style={common.container}>
        <View style={common.inAppHeaderArea}>
          <Text style={common.header}>Feed</Text>
        </View>
        <View style={common.mainArea}>
          <Text style={common.text}>A list of most recent recordings awaiting correction</Text>
        </View>
      </View>
    );
  }
}
