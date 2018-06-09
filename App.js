import React from 'react';
import {createStore} from 'redux';
import { Provider, connect } from 'react-redux';
import Home from './src/Home'

const store = createStore((state, action) => {});

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Home />
      </Provider>
    );
  }
}
