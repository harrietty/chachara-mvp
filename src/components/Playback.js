import PropTypes from 'prop-types';
import React from 'react';
import { View, TouchableOpacity, Slider } from 'react-native';
import { connect } from 'react-redux';
import { FileSystem } from 'expo';
import Icon from 'react-native-vector-icons/FontAwesome';

import { uploadToS3 } from '../actions/content.actions';
import Button from '../reusable/Button';
import Spinner from '../reusable/Spinner';

import styles from '../styles/playback';

class Playback extends React.Component {
  state = {
    isPlaying: false,
    sound: null,
    soundPosition: 0,
    isLoaded: false,
    totalRecordingLength: 0
  }

  async componentDidMount () {
    const recording = this.props.navigation.getParam('recording', {});
    await this.setMostRecentRecordingSound(recording);
  }

  componentDidUpdate () {
    if (this.props.uploadStatus === 'success') {
      this.props.navigation.navigate('QuestionList');
    }
  }

  setMostRecentRecordingSound = async (recording) => {
    const {
      sound
    } = await recording.createNewLoadedSound({
      isLooping: false,
      isMuted: false,
      volume: 1.0,
      rate: 1.0
    }, (status) => {
      if (status.isLoaded && !this.state.isLoaded) {
        this.setState({
          isLoaded: true,
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
    const recording = this.props.navigation.getParam('recording', {});
    if (!this.state.sound) {
      await this.setMostRecentRecordingSound(recording);
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

  discardSound = async () => {
    const recording = this.props.navigation.getParam('recording', {});
    await FileSystem.deleteAsync(recording._uri);
    this.props.navigation.navigate('QuestionList');
  }

  saveSound = async () => {
    const question = this.props.navigation.getParam('question', {});
    const recording = this.props.navigation.getParam('recording', {});
    const { uri } = await FileSystem.getInfoAsync(recording.getURI());
    fetch(uri)
      .then(response => response.blob())
      .then(buffer => {
        this.props.uploadToS3(buffer, uri, this.props.user, question._id, recording._finalDurationMillis);
      });
  }

  render () {
    const {isPlaying, soundPosition, isLoaded, totalRecordingLength} = this.state;
    const {isUploading} = this.props;

    if (isUploading) return <Spinner />;
    else return (
      <View style={styles.container}>
        {this.state.sound && isLoaded && (
          <View style={{justifyContent: 'center', alignItems: 'stretch'}}>
            <Slider minimumTrackTintColor='#A7BBC2' maximumTrackTintColor='#21708A' style={styles.slider} step={1} maximumValue={totalRecordingLength} minimumValue={0} value={soundPosition} />
          </View>
        )}
        <TouchableOpacity onPress={this.playPauseSound}>
          {!isPlaying && <Icon name='play-circle' size={60} color='#5E4B4D' />}
          {isPlaying && <Icon name='pause' size={60} color='#5E4B4D' />}
        </TouchableOpacity>
        <Button _onPressButton={this.saveSound}>Save</Button>
        <Button _onPressButton={this.discardSound}>Discard</Button>
      </View>
    );
  }

  static propTypes = {
    navigation: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    uploadToS3: PropTypes.func.isRequired,
    isUploading: PropTypes.bool.isRequired,
    uploadStatus: PropTypes.string,
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  isUploading: state.content.isUploading,
  uploadStatus: state.content.uploadStatus,
});

const mapDispatchToProps = (dispatch) => ({
  uploadToS3: (buffer, uri, user, questionId, length) => {
    dispatch(uploadToS3(buffer, uri, user, questionId, length));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Playback);