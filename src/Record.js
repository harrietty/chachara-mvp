import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Record extends React.Component {
  static navigationOptions () {
    return {
      title: 'Practice',
    };
  }

  render () {
    return (
      <View style={styles.container}>
        <Text>Record an answer</Text>
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