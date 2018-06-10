import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class SignIn extends React.Component {
  render () {
    return (
      <View style={styles.container}>
        <Text>Sign in</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  }
});