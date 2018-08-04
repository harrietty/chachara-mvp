import React from 'react';
import PropTypes from 'prop-types';
import { Image, TouchableOpacity } from 'react-native';

import renderFlag from '../../renderFlag';

export default class SupportedLangChoice extends React.Component {
  toggleLanguageChoice = () => {
    return this.props.toggleLanguageChoice(this.props.language);
  }
  render () {
    let border = this.props.selected ? '#fff' : 'transparent';
    let opacity = this.props.selected ? 1 : 0.4;
    return (
      <TouchableOpacity
        style={{
          width: 50,
          height: 50,
          margin: 10,
          borderRadius: 25,
          shadowOffset: { width: 0, height: 0 },
          shadowRadius: 7,
          shadowColor: border,
          shadowOpacity: 1
        }}
        onPress={this.toggleLanguageChoice}
      >
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
      </TouchableOpacity>
    );
  }

  static propTypes = {
    language: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
    toggleLanguageChoice: PropTypes.func.isRequired,
  }
}