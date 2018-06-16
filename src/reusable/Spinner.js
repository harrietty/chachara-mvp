import React from 'react';
import { View, ActivityIndicator } from 'react-native';

import common from '../styles/common';

export default class Spinner extends React.Component {
  render () {
    return (
      <View style={common.spinnerContainer}>
        <ActivityIndicator size='large' color = '#B2646F' />
      </View>
    );
  }
}