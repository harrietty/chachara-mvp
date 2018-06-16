import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text } from 'react-native';
import common from '../styles/common';

export default class Button extends React.Component {
  render () {
    return (
      <TouchableOpacity
        style={common.touchableOpacity}
        onPress={this.props._onPressButton} >
        <Text style={common.buttonText}>
          {this.props.children}
        </Text>
      </TouchableOpacity>
    );
  }

  static propTypes = {
    children: PropTypes.string.isRequired,
    _onPressButton: PropTypes.func.isRequired,
  }
}