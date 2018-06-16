import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Feed extends React.Component {
  static navigationOptions () {
    return {
      title: 'Feed',
    };
  }

  render () {
    return (
      <View style={styles.container}>
        <Text>A feed of most recent items to correct</Text>
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