import PropTypes from 'prop-types';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native';

import question from '../styles/question';

export default class RecordButton extends React.Component {
  render () {
    return (
      <TouchableOpacity style={question.recordContainer}>
        <Icon name='microphone' size={25} color='#B2646F' />
      </TouchableOpacity>
    );
  }
}
