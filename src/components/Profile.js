import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, ImageBackground } from 'react-native';

import SignOutButton from '../reusable/SignOutButton';

import common from '../styles/common';
import app from '../stylesNew/app';

export default class Profile extends React.Component {
  static navigationOptions () {
    return {
      title: 'Profile',
    };
  }

  render () {
    return (
      <ImageBackground source={require('../img/bg-faded.jpg')} style={{flex: 1}}>
        <View style={app.container}>
          <View style={common.inAppHeaderArea}>
            <Text style={common.header}>Profile</Text>
          </View>
          <View style={common.mainArea}>
            <SignOutButton />
          </View>
        </View>
      </ImageBackground>
    );
  }
}

Profile.propTypes = {
  navigation: PropTypes.object.isRequired,
};
