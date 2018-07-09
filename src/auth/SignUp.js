import PropTypes from 'prop-types';
import React from 'react';
import { Text, TextInput, View, KeyboardAvoidingView, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';

import { createSignUpError, signUp, updateSignUpForm, clearSignInError, updateSignInForm } from '../actions/auth.actions';
import Button from '../reusable/Button';
import TextLink from '../reusable/TextLink';
import Spinner from '../reusable/Spinner';

import common from '../styles/common';
import auth from '../stylesNew/auth';

class SignUp extends React.Component {
  handleSubmit = () => {
    const emailRegex =/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const {email, username, password, confirmPassword} = this.props;

    if (!email || !username || !password || !confirmPassword) {
      this.props.createSignUpError('Please complete all fields');
    } else if (password !== confirmPassword) {
      this.props.createSignUpError('Passwords must match');
    } else if (!emailRegex.test(email)) {
      this.props.createSignUpError('Invalid email address');
    } else if (password.length < 8) {
      this.props.createSignUpError('Passwords must be at least 8 characters');
    } else if (!/[0-9]/.test(password) || !/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
      this.props.createSignUpError('Passwords must contain numbers, uppercase and lowercase letters');
    } 
    else {
      this.props.signUp(email, password, username);
    }
  }

  goToConfirm = (username) => {
    this.props.navigation.navigate({
      routeName: 'Confirm',
      params: { username, password: this.props.password }
    });
  }

  goToSignIn = () => {
    this.props.navigation.navigate({
      routeName: 'SignIn',
    });
  }

  componentDidUpdate () {
    if (this.props.userConfirmed === false) {
      this.goToConfirm(this.props.user.username);
    }
  }

  renderSignUpError () {
    return (
      <Text style={common.error}>
        {this.props.error}
      </Text>);
  }

  render () {
    const { username, email, password, confirmPassword, loading } = this.props;
    if (loading) return <Spinner />;
    else return (
      <ImageBackground source={require('../img/bg.jpg')} style={auth.background}>
        <KeyboardAvoidingView style={auth.keyboardView} enabled behavior='padding'>
          <View style={auth.header}>
            <Icon name={'ios-chatbubbles'} size={45} color='#2E2E28' />;
            <Text style={auth.headerText}>Chachara</Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <TextInput
              style={common.input}
              keyboardType='email-address'
              placeholder='Email address'
              onChangeText={this.props.updateSignUpForm('email')}
              value={email}
            />
            <TextInput
              style={common.input}
              placeholder="Username"
              onChangeText={this.props.updateSignUpForm('username')}
              value={username}
            />
            <TextInput
              style={common.input}
              secureTextEntry
              placeholder="Password"
              onChangeText={this.props.updateSignUpForm('password')}
              value={password}
            />
            <TextInput
              style={common.input}
              secureTextEntry
              placeholder="Confirm password"
              onChangeText={this.props.updateSignUpForm('confirmPassword')}
              value={confirmPassword}
            />

            {this.props.error && this.renderSignUpError()}
            
            <Button _onPressButton={this.handleSubmit}>
              Sign up
            </Button>

            <TextLink onPress={this.goToSignIn}>
              Sign in instead
            </TextLink>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }

  static propTypes = {
    navigation: PropTypes.object.isRequired,
    error: PropTypes.string,
    user: PropTypes.object,
    userConfirmed: PropTypes.bool,
    signUp: PropTypes.func.isRequired,
    email: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    confirmPassword: PropTypes.string.isRequired,
    updateSignUpForm: PropTypes.func.isRequired,
    createSignUpError: PropTypes.func.isRequired,
    clearSignInError: PropTypes.func.isRequired,
    clearSignInForm: PropTypes.func.isRequired,
  }
}

const mapStateToProps = ({ auth, signUp }) => ({
  userConfirmed: auth.userConfirmed,
  user: auth.user,
  error: signUp.error,
  username: signUp.username,
  password: signUp.password,
  confirmPassword: signUp.confirmPassword,
  email: signUp.email,
  loading: signUp.loading,
});

const mapDispatchToProps = (dispatch) => ({
  signUp: (email, password, username) => {
    dispatch(signUp(email, password, username));
  },
  updateSignUpForm: (key) => (value) => {
    dispatch(updateSignUpForm(key, value));
  },
  createSignUpError: (err) => {
    dispatch(createSignUpError(err));
  },
  clearSignInForm: () => {
    dispatch(updateSignInForm('username', ''));
    dispatch(updateSignInForm('password', ''));
  },
  clearSignInError: () => {
    dispatch(clearSignInError());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
