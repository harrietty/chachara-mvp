import PropTypes from 'prop-types';
import React from 'react';
import { Text, TextInput, View } from 'react-native';
import { connect } from 'react-redux';

import { confirmSignUp, updateConfirmForm } from '../actions/auth.actions';
import Button from '../reusable/Button';
import SignOutButton from '../reusable/SignOutButton';
import TextLink from '../reusable/TextLink';
import Spinner from '../reusable/Spinner';

import common from '../styles/common';

class Confirm extends React.Component {
  componentDidMount() {
    const username = this.props.navigation.getParam('username') || '';
    this.setState({ username });
  }

  handleChange = (key) => (value) => {
    if (key === 'username') value = value.toLowerCase();
    this.setState({ [key]: value });
  }
  
  confirm = () => {
    const {username, code, password, previouslyEnteredUsername} = this.props;
    const uname = username || previouslyEnteredUsername;
    this.props.confirmSignUp(uname, code, password);
  }

  goBack = () => {
    this.props.navigation.goBack();
  }

  goToSignIn = () => {
    this.props.navigation.navigate({
      routeName: 'SignIn',
    });
  }

  signInAgain = () => {
    return (
      <View style={common.container}>
        <Text style={common.header}>
          User confirmed. Please sign in again.
        </Text>
        <Button _onPressButton={this.goToSignIn}>
          Go to sign in
        </Button>
      </View>
    );
  }

  // TODO: make sure errors disappear when moving between pages
  render () {
    const {previouslyEnteredUsername, code, username, loading, error } = this.props;
    const uname = previouslyEnteredUsername || username;
    if (error === 'Incorrect username or password.') return this.signInAgain();
    else if (loading) return <Spinner />;
    else return (
      <View style={common.container}>
        <Text style={common.header}>
          Please paste the code we have emailed you:
        </Text>

        <Text style={common.inputLabel}>Username:</Text>
        <TextInput
          style={common.input}
          placeholder='User Name'
          onChangeText={this.props.updateConfirmForm('username')}
          value={uname}
        />

        <Text style={common.inputLabel}>Confirmation code:</Text>
        <TextInput
          style={common.input}
          placeholder='Confirmation Code'
          onChangeText={this.props.updateConfirmForm('code')}
          value={code}
        />

        {error && <Text style={common.error}>{error}</Text>}
        <Button _onPressButton={this.confirm}>
          Confirm
        </Button>
        <TextLink onPress={this.goBack}>
          Back to sign up
        </TextLink>
        
        {/* FOR DEVELOPMENT */}
        <SignOutButton/>
      </View>
    );
  }

  static propTypes = {
    navigation: PropTypes.object.isRequired,
    confirmSignUp: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
    previouslyEnteredUsername: PropTypes.string.isRequired,
    updateConfirmForm: PropTypes.func.isRequired,
  }
}

const mapStateToProps = ({signUp, signIn, confirm}) => ({
  error: confirm.error,
  loading: confirm.loading,
  previouslyEnteredUsername: signIn.username || signUp.username,
  code: confirm.code,
  username: confirm.username,
  password: signIn.password || signUp.password,
});

const mapDispatchToProps = (dispatch) => ({
  confirmSignUp: (username, code, password) => {
    dispatch(confirmSignUp(username, code, password));
  },
  updateConfirmForm: (key) => (value) => {
    dispatch(updateConfirmForm(key, value));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Confirm);
