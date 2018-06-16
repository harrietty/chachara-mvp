import { Font } from 'expo';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { checkForAuthenticatedUser } from './actions/auth.actions';
import AuthNav from './auth/AuthNav';
import Spinner from './reusable/Spinner';
import Nav from './Nav';

class Main extends React.Component {
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
    const { signedIn, userConfirmed } = this.props;
    if (fontLoaded) {
      if (userConfirmed === false || !signedIn) return <AuthNav />;
      else if (signedIn) return <Nav />;
      else return null;
    } else {
      return <Spinner />;
    }
  }
  
  static propTypes = {
    checkForAuthenticatedUser: PropTypes.func.isRequired,
    signedIn: PropTypes.bool.isRequired,
    userConfirmed: PropTypes.bool,
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    signedIn: auth.signedIn,
    userConfirmed: auth.userConfirmed,
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
