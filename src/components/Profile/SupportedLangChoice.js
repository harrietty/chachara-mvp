import React from 'react';
import PropTypes from 'prop-types';
import { View, Image } from 'react-native';

import renderFlag from '../../renderFlag';

export default class SupportedLangChoice extends React.Component {
  render () {
    let border = this.props.selected ? '#fff' : 'transparent';
    let opacity = this.props.selected ? 1 : 0.4;
    return (
      <View style={{
        width: 50,
        height: 50,
        margin: 10,
        borderRadius: 25,
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 7,
        shadowColor: border,
        shadowOpacity: 1
      }}>
        <Image
          source={renderFlag(this.props.language)}
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            resizeMode: 'cover',
            opacity: opacity,
            borderWidth: 1,
            borderColor: border
          }}
        />
      </View>
    );
  }

  static propTypes = {
    language: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
  }
}