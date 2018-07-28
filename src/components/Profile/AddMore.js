import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class LanguageFlagCircle extends React.Component {
  render () {
    return (
      <TouchableOpacity style={{
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-around'
      }}
      onPress={this.props.onPress} >
        <Icon name='plus' size={40} color='#CCC4C5' />
      </TouchableOpacity>
    );
  }

  static propTypes = {
    onPress: PropTypes.func.isRequired,
  }
}
