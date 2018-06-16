import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { Font } from 'expo';
import Nav from './Nav';
import AuthNav from './auth/AuthNav';

import {checkForAuthenticatedUser} from './actions';

class Main extends React.Component {
  static propTypes = {
    checkForAuthenticatedUser: PropTypes.func.isRequired,
    signedIn: PropTypes.bool.isRequired,
    awaitingConfirmation: PropTypes.bool.isRequired,
    userLoading: PropTypes.bool.isRequired,
  }

  state = {
    fontLoaded: false
  }

  async componentDidMount() {
    this.props.checkForAuthenticatedUser();

    await Font.loadAsync({
      'feather': require('../assets/Fonts/FontAwesome.ttf'),
    });
    this.setState({
      fontLoaded: true
    });
  }

  render() {
    const { fontLoaded } = this.state;
    const { signedIn, awaitingConfirmation, userLoading } = this.props;
    if (fontLoaded) {
      if (awaitingConfirmation || !signedIn) return <AuthNav />;
      else if (signedIn) return <Nav />;
      else if (userLoading) return <Text>Loading</Text>;
      else return null;
    } else {
      return <Text>Loading</Text>;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    signedIn: state.auth.signedIn,
    userLoading: state.auth.loading,
    awaitingConfirmation: state.auth.awaitingConfirmation,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkForAuthenticatedUser: () => {
      dispatch(checkForAuthenticatedUser());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);