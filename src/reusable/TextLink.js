import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default class TextLink extends React.Component {
  render () {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <Text style={styles.create}>
          {this.props.children}
        </Text>
      </TouchableOpacity>
    );
  }

  static propTypes = {
    children: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
  }
}

const styles = StyleSheet.create({
  create: {
    marginTop: 10,
    fontSize: 22,
    fontFamily: 'AvenirNext-UltraLight',
    textAlign: 'center'
  }
});
