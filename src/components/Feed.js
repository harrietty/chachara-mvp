import React from 'react';
import { Text, View, ImageBackground } from 'react-native';

import common from '../styles/common';
import app from '../stylesNew/app';

export default class Feed extends React.Component {
  static navigationOptions () {
    return {
      title: 'Feed',
    };
  }

  render () {
    return (
      <ImageBackground source={require('../img/bg-faded.jpg')} style={{flex: 1}}>
        <View style={app.container}>
          <View style={common.inAppHeaderArea}>
            <Text style={common.header}>Feed</Text>
          </View>
          <View style={common.mainArea}>
            <Text style={common.text}>A list of most recent recordings awaiting correction</Text>
          </View>
        </View>
      </ImageBackground>
    );
  }
}
