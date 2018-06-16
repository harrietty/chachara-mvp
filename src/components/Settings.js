import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';

import SignOutButton from '../reusable/SignOutButton';

import common from '../styles/common';

export default class UserProfile extends React.Component {
  static navigationOptions () {
    return {
      title: 'Settings',
    };
  }

  render () {
    return (
      <View style={common.container}>
        <View style={common.inAppHeaderArea}>
          <Text style={common.header}>Settings</Text>
        </View>
        <View style={common.mainArea}>
          <SignOutButton />
        </View>
      </View>
    );
  }
}

UserProfile.propTypes = {
  navigation: PropTypes.object.isRequired,
};
