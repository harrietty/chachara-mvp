import React from 'react';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';

import Nav from './src/Nav';
import AuthNav from './src/AuthNav';

const store = createStore((state, action) => {});

export default class App extends React.Component {
  state = {
    signedIn: false
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
