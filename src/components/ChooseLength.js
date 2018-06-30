import PropTypes from 'prop-types';
import React from 'react';
import { View, ImageBackground, Text } from 'react-native';

import TextLink from '../reusable/TextLink';
import UpDownButton from './UpDownButton';
import RecordingArea from './RecordingArea';

import common from '../styles/common';
import styles from '../styles/chooseLength';
import buttonStyles from '../styles/upDownButton';

export default class ChooseLength extends React.Component {
  state = {
    speakingTime: 120,
    recordingInProgress: false
  }

  static MAX_SPEAKING_TIME = 300

  goToRecordPage = (length) => () => {
    this.props.navigation.navigate('Record', {length});
  }
  
  goBack = () => {
    this.props.navigation.goBack();
  }

  updateSpeakingTime = (time) => () => {
    this.setState({
      speakingTime: (this.state.speakingTime + time)
    });
  }

  disableButtons = () => {
    this.setState({
      recordingInProgress: true
    });
  }

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
          <Text style={common.text}>I want to speak for...</Text>
          <View style={buttonStyles.buttonContainer}>
            <UpDownButton
              iconName='minus'
              onPress={this.updateSpeakingTime(-30)}
              disabled={(this.state.speakingTime <= 30) || this.state.recordingInProgress} />
            <UpDownButton
              iconName='plus'
              onPress={this.updateSpeakingTime(30)}
              disabled={(this.state.speakingTime >= ChooseLength.MAX_SPEAKING_TIME) || this.state.recordingInProgress} />
          </View>
          <View>
            <Text style={common.text}>
              {this.state.speakingTime} seconds
            </Text>
          </View>
          <RecordingArea disableButtons={this.disableButtons} />
          <TextLink onPress={this.goBack}>
            Choose another question
          </TextLink>
        </View>
      </View>
    );
  }

  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }
}
