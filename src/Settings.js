import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';

import SignOutButton from './reusable/SignOutButton';

export default class UserProfile extends React.Component {
  static navigationOptions () {
    return {
      title: 'Settings',
    };
  }

  render () {
    const name = this.props.navigation.getParam('name', 'user');
    return (
      <View style={styles.container}>
        <Text>UserProfile Screen</Text>
        <Text>Welcome, {name}</Text>
        <SignOutButton />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});

UserProfile.propTypes = {
  navigation: PropTypes.object.isRequired,
};
