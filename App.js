import React from 'react';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import { Font } from 'expo';

import Nav from './src/Nav';
import AuthNav from './src/AuthNav';

const store = createStore((state, action) => {});

export default class App extends React.Component {
  state = {
    signedIn: true
  }

  componentDidMount() {
    Font.loadAsync({
      'feather': require('./assets/Fonts/FontAwesome.ttf'),
    });
  }

  render() {
    const { signedIn } = this.state;
    return (
      <Provider store={store}>
        {signedIn ? <Nav /> : <AuthNav />}
      </Provider>
    );
  }
}
