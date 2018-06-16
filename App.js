import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import Main from './src/Main';

import reducer from './src/reducers';

const store = createStore(reducer, applyMiddleware(thunk));

export default class ProvidedApp extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}