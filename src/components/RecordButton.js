import PropTypes from 'prop-types';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native';

import question from '../styles/question';

export default class RecordButton extends React.Component {
  render () {
    return (
      <TouchableOpacity onPress={this.props.onPress} style={question.recordContainer}>
        <Icon name='microphone' size={25} color='#B2646F' />
      </TouchableOpacity>
    );
  }

  static propTypes = {
    onPress: PropTypes.func.isRequired,
  }
}
