import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, ImageBackground } from 'react-native';

import common from '../styles/common';
import app from '../stylesNew/app';

export default class Error extends React.Component {
  render () {
    return (
      <ImageBackground source={require('../img/bg-faded.jpg')} style={{flex: 1}}>
        <View style={app.container}>
          <View style={common.inAppHeaderArea}>
            <Text style={common.header}>{this.props.header}</Text>
          </View>
          <View style={common.mainArea}>
            <Text style={app.errorText}>
              {this.props.children}
            </Text>
          </View>
        </View>
      </ImageBackground>
    );
  }

  static propTypes = {
    children: PropTypes.string.isRequired,
    header: PropTypes.string.isRequired,
  }
}