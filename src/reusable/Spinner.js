import React from 'react';
import { View, ActivityIndicator, ImageBackground } from 'react-native';

export default class Spinner extends React.Component {
  render () {
    return (
      <ImageBackground source={require('../img/bg-faded.jpg')} style={{flex: 1}}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size='large' color = '#CCC4C5' />
        </View>
      </ImageBackground>
    );
  }
}