import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';

import renderFlag from '../../renderFlag';

export default class LanguageFlagCircle extends React.Component {
  render () {
    return (
      <Image
        source={renderFlag(this.props.language)}
        style={{
          width: 50,
          height: 50,
          borderRadius: 25,
          marginRight: 7,
          marginLeft: 7,
          resizeMode: 'cover',
        }}
      />
    );
  }

  static propTypes = {
    language: PropTypes.string.isRequired
  }
}
