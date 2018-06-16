import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import { connect } from 'react-redux';

import { signIn } from '../actions';

class SignIn extends React.Component {
  state = {
    username: '',
    password: '',
  }

  handleInputChange = (key) => {
    return (text) => {
      this.setState({ [key]: text });
    };
  }

  handleSignIn = () => {
    this.props.signIn(this.state.username, this.state.password);
  }

  renderSignInError () {
    return (<Text>
      {this.props.error}
    </Text>);
  }

  render () {
    return (
      <View style={styles.container}>
        <Text>Sign in</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={this.handleInputChange('username')}
        />
        <TextInput
          style={styles.input}
          secureTextEntry
          placeholder="Password"
          onChangeText={this.handleInputChange('password')}
        />
        {this.props.error && this.renderSignInError()}
        <Button 
          title='Sign in'
          onPress={this.handleSignIn}
        />
      </View>
    );
  }

  static propTypes = {
    signIn: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  input: {
    height: 40,
    fontSize: 18,
    borderWidth: 1,
    borderRadius: 10,
    padding: 3,
    margin: 3,
    width: 300,
    backgroundColor: 'white'
  }
});

const mapStateToProps = ({ auth }) => ({
  user: auth.user,
  error: auth.error
});

const mapDispatchToProps = (dispatch) => ({
  signIn: (username, password) => {
    dispatch(signIn(username, password));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);