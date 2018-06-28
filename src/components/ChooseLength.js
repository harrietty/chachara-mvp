import PropTypes from 'prop-types';
import React from 'react';
import { View, ImageBackground, Text } from 'react-native';

import common from '../styles/common';
import styles from '../styles/chooseLength';

export default class ChooseLength extends React.Component {
  render () {
    const q = this.props.navigation.getParam('question', {});
    return (
      <View style={common.container}>
        <View style={styles.bubbleContainer}>
          <ImageBackground source={require('../img/speech2.png')} style={styles.bubbleImage}>
            <View style={styles.bubbleTextContainer}>
              <Text style={styles.bubbleText}>{q.text}</Text>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.mainContainer}>
          <Text>
            more stuff here
          </Text>
        </View>
      </View>
    );
  }

  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }
}
