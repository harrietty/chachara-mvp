import PropTypes from 'prop-types';
import React from 'react';
import { Text, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { StackActions, NavigationActions } from 'react-navigation';

import { clearSignInError, createSignInError, signIn, updateSignInForm, updateSignUpForm, clearSignUpError } from '../actions/auth.actions';
import Button from '../reusable/Button';
import TextLink from '../reusable/TextLink';
import Spinner from '../reusable/Spinner';

import common from '../styles/common';

class SignIn extends React.Component {
  handleSignIn = () => {
    if (!this.props.username || !this.props.password) {
      this.props.createSignInError('Username and password required');
    } else {
      this.props.clearSignInError();
      this.props.signIn(this.props.username, this.props.password);
    }
  }

  renderSignInError () {
    return (<Text>
      {this.props.error}
    </Text>);
  }

  componentDidUpdate () {
    if (this.props.userConfirmed === false) {
      this.props.clearSignInError();
      this.goToConfirm(this.props.user.username);
    }
  }

  componentDidMount () {
    if (this.props.userConfirmed === false) {
      this.props.clearSignInError();
      this.goToConfirm(this.props.user.username);
    }
  }

  goToSignUp = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'SignUp' })],
    });
    this.props.navigation.dispatch(resetAction);
  }

  goToConfirm = (username) => {
    this.props.clearSignInError();
    this.props.navigation.navigate({
      routeName: 'Confirm',
      params: { username, password: this.props.password }
    });
  }

  render () {
    if (this.props.loading) return <Spinner />;
    else return (
      <View style={common.container}>
        <View style={common.headerArea}>
          <Text style={common.header}>Chachara</Text>
          <Icon name={'ios-chatbubbles-outline'} size={55} color={common.header.color} />;
        </View>
        <View style={common.mainArea}>
          <TextInput
            style={common.input}
            value={this.props.username}
            placeholder="Username"
            onChangeText={this.props.updateUsername}
          />
          <TextInput
            style={common.input}
            value={this.props.password}
            secureTextEntry
            placeholder="Password"
            onChangeText={this.props.updatePassword}
          />
          {this.props.error && <Text style={common.error}>{this.props.error}</Text>}
          <Button _onPressButton={this.handleSignIn}>
            Sign in
          </Button>
          <TextLink onPress={this.goToSignUp}>
            Create an account
          </TextLink>
        </View>
      </View>
    );
  }

  static propTypes = {
    signIn: PropTypes.func.isRequired,
    updateUsername: PropTypes.func.isRequired,
    updatePassword: PropTypes.func.isRequired,
    createSignInError: PropTypes.func.isRequired,
    user: PropTypes.object,
    error: PropTypes.string,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    userConfirmed: PropTypes.bool,
    navigation: PropTypes.object.isRequired,
    clearSignInError: PropTypes.func.isRequired,
    clearSignUpError: PropTypes.func.isRequired,
    clearSignUpForm: PropTypes.func.isRequired,
  }
}

const mapStateToProps = ({ signIn, auth }) => ({
  user: auth.user,
  username: signIn.username,
  password: signIn.password,
  error: signIn.error,
  userConfirmed: auth.userConfirmed,
  loading: signIn.loading,
});

const mapDispatchToProps = (dispatch) => ({
  signIn: (username, password) => {
    dispatch(signIn(username, password));
  },
  clearSignInError: () => {
    dispatch(clearSignInError());
  },
  updateUsername: (value) => {
    dispatch(updateSignInForm('username', value));
  },
  updatePassword: (value) => {
    dispatch(updateSignInForm('password', value));
  },
  createSignInError: (err) => {
    dispatch(createSignInError(err));
  },
  clearSignUpError: () => {
    dispatch(clearSignUpError());
  },
  clearSignUpForm: () => {
    dispatch(updateSignUpForm('username', ''));
    dispatch(updateSignUpForm('password', ''));
    dispatch(updateSignUpForm('email', ''));
    dispatch(updateSignUpForm('confirmPassword', ''));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
