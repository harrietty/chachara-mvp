import PropTypes from 'prop-types';
import { Permissions } from 'expo';
import React from 'react';
import { View, ImageBackground, Text } from 'react-native';

import TextLink from '../reusable/TextLink';
import UpDownButton from './UpDownButton';
import RecordingArea from './RecordingArea';
import Spinner from '../reusable/Spinner';

import common from '../styles/common';
import styles from '../styles/chooseLength';
import buttonStyles from '../styles/upDownButton';

export default class ChooseLength extends React.Component {
  state = {
    speakingTime: 2,
    recordingInProgress: false,
    permissionToRecord: false,
    isLoading: true
  }

  static MAX_SPEAKING_TIME = 300
  static MIN_SPEAKING_TIME = 2
  static STEP = 10

  askForPermissionToRecord = async () => {
    const {
      status
    } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    if (status === 'granted') {
      this.setState({
        permissionToRecord: true,
        isLoading: false
      });
    } else {
      this.setState({
        permissionToRecord: false,
        isLoading: false
      });
    }
  }

  async componentDidMount() {
    await this.askForPermissionToRecord();
  }

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

  moveToPlayback = (recording) => {
    this.props.navigation.navigate('Playback', {recording});
  }

  render () {
    const q = this.props.navigation.getParam('question', {});
    const { permissionToRecord, isLoading } = this.state;
    if (isLoading) return <Spinner />;
    else return (
      <View style={common.container}>
        <View style={styles.bubbleContainer}>
          <ImageBackground source={require('../img/speech2.png')} style={styles.bubbleImage}>
            <View style={styles.bubbleTextContainer}>
              <Text style={styles.bubbleText}>{q.text}</Text>
            </View>
          </ImageBackground>
        </View>
        {!permissionToRecord && (<Text>Chachara needs permission to access the microphone</Text>)}
        <View style={styles.mainContainer}>
          <View style={{alignItems: 'center'}}>
            <Text style={common.text}>I want to speak for...</Text>
            <View style={buttonStyles.buttonContainer}>
              <UpDownButton
                iconName='minus'
                onPress={this.updateSpeakingTime(-ChooseLength.STEP)}
                disabled={(this.state.speakingTime <= ChooseLength.MIN_SPEAKING_TIME) || this.state.recordingInProgress} />
              <UpDownButton
                iconName='plus'
                onPress={this.updateSpeakingTime(ChooseLength.STEP)}
                disabled={(this.state.speakingTime >= ChooseLength.MAX_SPEAKING_TIME) || this.state.recordingInProgress} />
            </View>
            <View>
              <Text style={common.text}>
                {this.state.speakingTime} seconds
              </Text>
            </View>
          </View>
          <RecordingArea
            selectedTime={this.state.speakingTime}
            disableButtons={this.disableButtons}
            moveToPlayback={this.moveToPlayback} />
        </View>
      </View>
    );
  }

  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }
}
