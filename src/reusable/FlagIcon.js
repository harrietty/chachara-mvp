import PropTypes from 'prop-types';
import React from 'react';
import { ImageBackground } from 'react-native';

export default function FlagIcon (props) {
  if (props.flag === 'es') {
    return (
      <ImageBackground source={require('../img/flags/es.png')} style={{width: 20, height: 20}}>
      </ImageBackground>
    );
  }
}

FlagIcon.propTypes = {
  flag: PropTypes.string.isRequired
};
