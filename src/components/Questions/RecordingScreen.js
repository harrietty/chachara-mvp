import PropTypes from 'prop-types';
import React from 'react';
import { Audio, FileSystem } from 'expo';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import QuestionDetail from '../../reusable/QuestionDetail';
import AnimatedSequence from './AnimatedSequence';
import Slider from './Slider';
import RecordingProgressIndicator from './RecordingProgressIndicator';
import { uploadToS3, acknowledgeSuccess } from '../../actions/content.actions';

import Button from '../../reusable/Button';

import style from '../../stylesNew/app';

const getAudioConfig = (mode) => {
  return {
    'PLAYBACK': {
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      playsInSilentLockedModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX
    },
    'RECORDING': {
      allowsRecordingIOS: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      shouldDuckAndroid: true,
    }
  }[mode];
};

class RecordingScreen extends React.Component {
  state = {
    speakingTime: 5,
    elapsedRecordingTime: 0,
    modalVisible: true,
    animationComplete: false,
    recording: null,
    isRecording: false,
    error: null,
    intervalId: null,
    finished: false,
    playbackIsLoaded: false,
    totalRecordingLength: 0,
    soundPosition: 0,
    isPlaying: false
  }
  
  updateSpeakingTime = (value) => {
    this.setState({
      speakingTime: value
    });
  }

  toggleModal = () => {
    this.setState({
      modalVisible: !this.state.modalVisible
    });
  }

  renderTime = () => {
    const time = this.state.speakingTime;
    if (time < 60) return `${time} seconds`;
    else return `${time / 60} minutes`;
  }

  startRecording = async () => {
    this.setState({
      animationComplete: true
    });
    
    await this.startAudioRecorder();
    this.beginProgressCountdown();
  }

  pauseRecording = async () => {
    clearInterval(this.state.intervalId);
    await this.state.recording.pauseAsync();
    this.setState({
      isRecording: false,
      intervalId: null
    });
  }

  continueRecording = async () => {
    this.beginProgressCountdown();
    await this.state.recording.startAsync();
  }

  startAudioRecorder = async () => {
    await Audio.setAudioModeAsync(getAudioConfig('RECORDING'));
    this.state.recording = new Audio.Recording();
    try {
      await this.state.recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await this.state.recording.startAsync();
    } catch (error) {
      this.setState({
        error
      });
    }
  }

  beginProgressCountdown = () => {
    const intervalId = setInterval(() => {
      const newTime = this.state.elapsedRecordingTime + 1;
      this.setState({
        elapsedRecordingTime: newTime,
        isRecording: true
      });
      if (newTime >= this.state.speakingTime) {
        this.stopRecording();
      }
    }, 1000);

    this.setState({intervalId});
  }

  stopRecording = async () => {
    clearInterval(this.state.intervalId);

    try {
      await this.state.recording.stopAndUnloadAsync();
    } catch (error) {
      this.setState({
        error
      });
    }
    
    await Audio.setAudioModeAsync(getAudioConfig('PLAYBACK'));
    await this.setMostRecentRecordingSound();
    
    this.setState({
      isRecording: false,
      intervalId: null,
      finished: true
    });
  }

  setMostRecentRecordingSound = async () => {
    const {
      sound
    } = await this.state.recording.createNewLoadedSound({
      isLooping: false,
      isMuted: false,
      volume: 1.0,
      rate: 1.0
    }, (status) => {
      if (status.isLoaded && !this.state.isLoaded) {
        this.setState({
          playbackIsLoaded: true,
          totalRecordingLength: status.playableDurationMillis,
        });
      }
      this.setState({
        soundPosition: status.positionMillis || 0
      });
      if (status.didJustFinish) {
        this.state.sound.setPositionAsync(0);
        this.setState({
          isPlaying: false,
          soundPosition: 0
        });
      }
    });
    this.setState({
      sound
    });
  }

  playPauseSound = async () => {
    if (!this.state.sound) {
      await this.setMostRecentRecordingSound(this.state.recording);
    }
    const { isPlaying, sound } = this.state;
    if (isPlaying) {
      sound.pauseAsync();
      this.setState({
        isPlaying: false
      });
    } else {
      sound.playAsync();
      this.setState({
        isPlaying: true
      });
    }
  }

  goBackToQuestionList = () => {
    this.props.acknowledgeSuccess();
    this.props.navigation.navigate('QuestionList');
  }

  renderFinishedScreen = () => {
    const { isPlaying } = this.state;
    const { isUploading, uploadStatus } = this.props;
    if (isUploading) {
      return (
        <ActivityIndicator size='large' color = '#CCC4C5' />
      );
    } else if (uploadStatus === 'success') {
      return (
        <Button _onPressButton={this.goBackToQuestionList}>
          Done
        </Button>
      );
    } else {
      return (
        <View>
          <TouchableOpacity onPress={this.playPauseSound} style={{alignItems: 'center', justifyContent: 'center', height: 100}}>
            <Icon name={isPlaying ? 'pause' : 'play'} size={50} color='#CCC4C5' />
          </TouchableOpacity>
          <Button _onPressButton={this.saveSound}>Save</Button>
          <Button _onPressButton={this.discardSound}>Discard</Button>
        </View>
      );
    }
  }

  saveSound = async () => {
    const recording = this.state.recording;
    const question = this.props.navigation.getParam('question', {});
    const user = this.props.user;

    const { uri } = await FileSystem.getInfoAsync(recording.getURI());
    fetch(uri)
      .then(response => response.blob())
      .then(buffer => {
        this.props.uploadToS3(buffer, uri, user, question._id, recording._finalDurationMillis);
      });
  }

  discardSound = async () => {
    await FileSystem.deleteAsync(this.state.recording._uri);
    this.setState({
      speakingTime: 5,
      elapsedRecordingTime: 0,
      modalVisible: false,
      animationComplete: false,
      recording: null,
      isRecording: false,
      error: null,
      finished: false,
      playbackIsLoaded: false,
      totalRecordingLength: 0,
      soundPosition: 0,
      isPlaying: false
    });
  }

  render () {
    const question = this.props.navigation.getParam('question', {});
    const currentRecordingProgress = (this.state.elapsedRecordingTime / this.state.speakingTime * 100);

    return (
      <View style={{backgroundColor: '#A5E8D8', flex: 1, justifyContent: 'space-around', alignItems: 'center'}}>

        <Modal
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {}}
          animationType='fade'>
          <View style={{backgroundColor: 'rgba(255, 255, 255, 0.7)', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <View style={{height: 400, width: '80%', backgroundColor: '#2E2929', opacity: 0.9, borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
              {!this.state.animationComplete && <AnimatedSequence
                values={[3, 2, 1, 'Go!', null]}
                style={{justifyContent: 'center', alignItems: 'center'}}
                onAnimationEnd={this.startRecording}
              />}

              {this.state.animationComplete && !this.state.finished && <RecordingProgressIndicator 
                isRecording={this.state.isRecording}
                finished={this.state.finished}
                continueRecording={this.continueRecording}
                pauseRecording={this.pauseRecording}
                currentRecordingProgress={currentRecordingProgress}
              />}
              {this.state.finished && this.renderFinishedScreen()}
            </View>
          </View>
        </Modal>

        <View style={{width: '100%', flex: 3}}>
          <QuestionDetail question={question} />
          <Text style={{fontFamily: 'AvenirNext-UltraLight', fontSize: 44, margin: 10}}>
            {question.text}
          </Text>
        </View>
        <View style={{width: '100%', flex: 1, alignItems: 'center'}}>
          <Slider
            speakingTime={this.state.speakingTime}
            updateSpeakingTime={this.updateSpeakingTime}
          />
          <Text style={{fontSize: 20, fontFamily: 'AvenirNext-UltraLight'}}>
            I want to speak for {this.renderTime()}
          </Text>
        </View>
        <View style={{width: '100%', flex: 3, alignItems: 'center', justifyContent: 'center'}}>
          <TouchableOpacity style={style.largeButtonContainer} onPress={this.toggleModal}>
            <Text style={style.largeButtonText}>
            Go!
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  static propTypes = {
    navigation: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    uploadToS3: PropTypes.func.isRequired,
    acknowledgeSuccess: PropTypes.func.isRequired,
    isUploading: PropTypes.bool.isRequired,
    uploadStatus: PropTypes.string,
  }
}

const mapStateToProps = ({ auth, content }) => ({
  user: auth.user,
  isUploading: content.isUploading,
  uploadStatus: content.uploadStatus,
});

const mapDispatchToProps = (dispatch) => ({
  uploadToS3: (buffer, uri, user, questionId, length) => {
    dispatch(uploadToS3(buffer, uri, user, questionId, length));
  },
  acknowledgeSuccess: () => {
    dispatch(acknowledgeSuccess());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(RecordingScreen);
