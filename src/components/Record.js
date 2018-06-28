import PropTypes from 'prop-types';
import React from 'react';
import {FileSystem} from 'expo';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

import AudioRecorder from './AudioRecorder';
import Button from '../reusable/Button';
import { uploadToS3, downloadAudioFile, loadAudio } from '../actions/content.actions';

import common from '../styles/common';

class Record extends React.Component {
  upload = (uri) => {
    const {idToken} = this.props.user;
    fetch(uri)
      .then(response => response.blob())
      .then(buffer => {
        this.props.uploadToS3(buffer, idToken);
      });
  }

  downloadAudioFile = async () => {
    const uri = await downloadAudioFile(
      'https://s3-eu-west-1.amazonaws.com/langappmvp-userfiles-mobilehub-377667998/public/main3.caf',
      FileSystem.documentDirectory + 'audio.caf'
    );
    console.log(uri);
    // loadAudio(uri);
  }
  render () {
    const q = this.props.navigation.getParam('question', {});
    const { uploadStatus, isUploading } = this.props;
    return (
      <View style={common.container}>
        <View style={common.headerArea}>
          <Text style={common.header}>
            Record your answer
          </Text>
        </View>
        <View style={common.mainArea}>
          <Text style={common.text}>
            {q.text}
          </Text>

          <AudioRecorder upload={this.upload} />
          {isUploading && <Text>Currently uploading...</Text>}
          {uploadStatus === 'failure' && <Text>Something went wrong</Text>}
          {uploadStatus === 'success' && <Text>Hurrah! We uploaded your file. </Text>}
          <Button _onPressButton={this.downloadAudioFile}>
            Download
          </Button>
        </View>
      </View>
    );
  }

  static propTypes = {
    user: PropTypes.object,
    uploadToS3: PropTypes.func.isRequired,
    uploadStatus: PropTypes.string,
    isUploading: PropTypes.bool.isRequired,
    navigation: PropTypes.object.isRequired,
  }
}

const mapStateToProps = ({ auth, content }) => ({
  user: auth.user,
  isUploading: content.isUploading,
  uploadStatus: content.uploadStatus,
});

const mapDispatchToProps = (dispatch) => ({
  uploadToS3: (uri, idToken) => {
    dispatch(uploadToS3(uri, idToken));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Record);
