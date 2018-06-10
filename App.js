import React from 'react';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import { Font } from 'expo';

import Nav from './src/Nav';
import AuthNav from './src/auth/AuthNav';

const store = createStore((state, action) => {});

export default class App extends React.Component {
  state = {
    signedIn: true,
    fontLoaded: false
  }

  async componentDidMount() {
    await Font.loadAsync({
      'feather': require('./assets/Fonts/FontAwesome.ttf'),
    });
    this.setState({
      fontLoaded: true
    });
  }

  render() {
    const { signedIn, fontLoaded } = this.state;
    if (fontLoaded) {
      return (
        <Provider store={store}>
          {signedIn ? <Nav /> : <AuthNav />}
        </Provider>
      );
    } else {
      return null;
    }
  }
}
