import PropTypes from 'prop-types';
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from '../styles/upDownButton';

export default class UpDownButton extends React.Component {
  render () {
    const { disabled } = this.props;
    if (disabled) return (
      <View style={styles.disabledButton}>
        <Icon name={this.props.iconName} size={40} color='white' />
      </View>
    );
    else return (
      <TouchableOpacity onPress={this.props.onPress} style={styles.opacity} >
        <View style={styles.button}>
          <Icon name={this.props.iconName} size={40} color='white' />
        </View>
      </TouchableOpacity>
    );
  }

  static propTypes = {
    iconName: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
  }
}