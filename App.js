import Amplify from 'aws-amplify';
import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import customAmplifyConfig from './.amplify.config.js';
import defaultAmplifyConfig from './src/aws-exports';
import Main from './src/Main';
import reducer from './src/reducers';

const store = createStore(reducer, applyMiddleware(...[logger, thunk]));

Amplify.configure(defaultAmplifyConfig);
Amplify.configure(customAmplifyConfig);

export default class ProvidedApp extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}
