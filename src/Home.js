import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class Home extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  }
  
  static navigationOptions = {
    title: 'Home',
  };

  render () {
    return (
      <View style={styles.container}>
        <Text>Home Screen</Text>
        <Button 
          onPress={() => this.props.navigation.navigate('UserProfile', {name: 'Mauro'})}
          title='My Profile'
        />
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
});