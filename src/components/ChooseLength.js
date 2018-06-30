import PropTypes from 'prop-types';
import React from 'react';
import { View, ImageBackground, Text, ScrollView } from 'react-native';

import Button from '../reusable/Button';
import TextLink from '../reusable/TextLink';

import common from '../styles/common';
import styles from '../styles/chooseLength';

const LENGTHS = [
  {seconds: 30, text: '30 seconds'},
  {seconds: 60, text: '1 minute'},
  {seconds: 90, text: '1.5 minutes'},
  {seconds: 120, text: '2 minutes'},
  {seconds: 300, text: '5 minutes'},
];

export default class ChooseLength extends React.Component {
  goToRecordPage = (length) => () => {
    this.props.navigation.navigate('Record', {length});
  }
  
  goBack = () => {
    this.props.navigation.goBack();
  }

  render () {
    const q = this.props.navigation.getParam('question', {});
    return (
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.bubbleContainer}>
          <ImageBackground source={require('../img/speech2.png')} style={styles.bubbleImage}>
            <View style={styles.bubbleTextContainer}>
              <Text style={styles.bubbleText}>{q.text}</Text>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.mainContainer}>
          <Text style={common.text}>I want to speak for...</Text>
          {LENGTHS.map((length, i) => (
            <Button key={i} _onPressButton={this.goToRecordPage(length)}>
              {length.text}
            </Button>
          ))}
          <TextLink onPress={this.goBack}>
            Choose another question
          </TextLink>
        </View>
      </ScrollView>
    );
  }

  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }
}
