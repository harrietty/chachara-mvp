import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createStore} from 'redux';
import { Provider, connect } from 'react-redux';

class Main extends React.Component {
  render () {
    return (
      <Text>hello world</Text>
    );
  }
}

const store = createStore((state, action) => {});

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}