import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class UserProfile extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const name = navigation.getParam('name', 'User');
    return {
      title: 'Recordings'
    };
  };

  render () {
    return (
      <View style={styles.container}>
        <Text>My Previous Recordings</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  }
})