import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Auth } from 'aws-amplify';
import { connect } from 'react-redux';

import { signUp } from '../actions';

class SignUp extends React.Component {
  state = {
    email: '',
    username: '',
    password: '',
    confirmedPassword: ''
  }
  handleInputChange = (key) => {
    return (text) => {
      this.setState({ [key]: text });
    }
  }
  handleSubmit = () => {
    const {email, username, password, confirmedPassword} = this.state;

    if (!email || !username || !password || !confirmedPassword) {
      return console.log('Fields missing');
    }
    if (password !== confirmedPassword) return console.log('Passwords don\'t match');
    
    this.props.signUp(email, password, username);
  }

  goToConfirm = (username) => {
    this.props.navigation.navigate({
      routeName: 'Confirm',
      params: { username }
    })
  }

  componentDidUpdate () {
    if (this.props.awaitingConfirmation) {
      this.goToConfirm(this.props.user.username);
    }
  }

  renderSignUpError () {
    return (<Text>
      {this.props.error}
    </Text>)
  }

  render () {
    return (
      <View style={styles.container}>
        <Text>Sign up</Text>
        <TextInput
          style={styles.input}
          keyboardType='email-address'
          placeholder="Email address"
          onChangeText={this.handleInputChange('email')}
        />
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
        <TextInput
          style={styles.input}
          secureTextEntry
          placeholder="Confirm password"
          onChangeText={this.handleInputChange('confirmedPassword')}
        />
        
        {this.props.error && this.renderSignUpError()}
        
        <Button 
          onPress={this.handleSubmit} 
          title='Sign Up'
        />
        {/* JUST SO WE JUMP TO CONFIRM PAGE FOR DEV */}
        <Button title='confirm' onPress={() => this.goToConfirm('harrietty')} />
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
  awaitingConfirmation: auth.awaitingConfirmation,
  user: auth.user,
  error: auth.error
});

const mapDispatchToProps = (dispatch) => ({
  signUp: (email, password, username) => {
    dispatch(signUp(email, password, username))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)