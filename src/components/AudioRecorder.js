import {
  Audio,
  FileSystem,
  Permissions
} from 'expo';
import PropTypes from 'prop-types';
import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View
} from 'react-native';

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


export default class AudioRecorder extends React.Component {
    state = {
      permissionToRecord: false,
      isLoading: true,
      isRecording: false,
      sound: null,
      isPlaying: false,
      error: null,
    }

    constructor(props) {
      super(props);

      this.recording = null;
    }

    async componentDidMount() {
      await this.askForPermissionToRecord();
    }

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

    startRecording = async () => {
      await Audio.setAudioModeAsync(getAudioConfig('RECORDING'));

      this.recording = new Audio.Recording();

      try {
        await this.recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
        await this.recording.startAsync();
      } catch (error) {
        this.setState({
          error
        });
      }

      this.setState({
        isRecording: true
      });
    }

    stopRecording = async () => {
      try {
        await this.recording.stopAndUnloadAsync();
      } catch (error) {
        this.setState({
          error
        });
      }
      this.setState({
        isRecording: false
      });

      await Audio.setAudioModeAsync(getAudioConfig('PLAYBACK'));
      await this.setMostRecentRecordingSound();
    }

    setMostRecentRecordingSound = async () => {
      const {
        sound
      } = await this.recording.createNewLoadedSound({
        isLooping: false,
        isMuted: false,
        volume: 1.0,
        rate: 1.0
      }, (status) => {
        if (status.didJustFinish) {
          this.state.sound.setPositionAsync(0);
          this.setState({
            isPlaying: false
          });
        }
      });
      this.setState({
        sound
      });
    }

    playPauseSound = async () => {
      if (!this.state.sound) {
        await this.setMostRecentRecordingSound();
      }
      const {
        isPlaying,
        sound
      } = this.state;
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

    save = async () => {
      const {
        uri
      } = await FileSystem.getInfoAsync(this.recording.getURI());
      this.props.upload(uri);
    }

    render() {
      const {
        isLoading,
        permissionToRecord,
        isRecording,
        isPlaying,
        sound,
        error
      } = this.state;

      if (isLoading) {
        return ( <
          View >
          <
          Text > Loading... < /Text> < /
          View >
        );
      } else if (!permissionToRecord) {
        return ( <
          Text > You must enable permission to record in order to use this < /Text>
        );
      } else {
        return ( <
          View style = {
            styles.container
          } >
          <
          View >
          <
          Button title = {
            isRecording ? 'Stop recording' : 'Start recording'
          }
          onPress = {
            isRecording ? this.stopRecording : this.startRecording
          }
          /> {
          sound && ( <
            View >
            <
            Button title = {
              isPlaying ? 'Pause' : 'Play'
            }
            onPress = {
              this.playPauseSound
            }
            /> < /
            View >
          )
        } {
          error && ( <
            Text > Something went wrong: -( < /Text>)
            } <
            Button title = 'Save'
            onPress = {
              this.save
            }
            /> < /
            View > <
            /View>
          );
        }
      }

      static propTypes = {
        upload: PropTypes.func.isRequired,
      }
    }

    const styles = StyleSheet.create({
      container: {
        borderRadius: 4,
        backgroundColor: 'whitesmoke',
        borderColor: '#d6d7da',
      },
    });
