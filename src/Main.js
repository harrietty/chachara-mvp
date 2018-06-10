import React from 'react';
import { connect } from 'react-redux';
import { Font } from 'expo';
import Nav from './Nav';
import AuthNav from './auth/AuthNav';

class Main extends React.Component {
  state = {
    fontLoaded: false
  }

  async componentDidMount() {
    await Font.loadAsync({
      'feather': require('../assets/Fonts/FontAwesome.ttf'),
    });
    this.setState({
      fontLoaded: true
    });
  }

  render() {
    const { fontLoaded } = this.state;
    const { signedIn } = this.props;
    if (fontLoaded) {
      return (
        signedIn ? <Nav /> : <AuthNav />
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    signedIn: state.auth.signedIn
  }
}

export default connect(mapStateToProps)(Main);