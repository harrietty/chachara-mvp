import PropTypes from 'prop-types';
import React from 'react';
import {FileSystem} from 'expo';
import { StyleSheet, Text, View, Button } from 'react-native';
import { connect } from 'react-redux';

import { uploadToS3, downloadAudioFile, loadAudio, fetchQuestions } from '../actions/content.actions';
import AudioRecorder from './AudioRecorder';
import RecordButton from './RecordButton';
import Spinner from '../reusable/Spinner';

import common from '../styles/common';
import question from '../styles/question';

class Practice extends React.Component {
  static navigationOptions () {
    return {
      title: 'Practice',
    };
  }

  componentDidMount() {
    this.props.fetchQuestions();
  }

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
    const { uploadStatus, isUploading, questions, questionsLoading } = this.props;
    return (
      <View style={common.container}>
        <View style={common.inAppHeaderArea}>
          <Text style={common.header}>Practice</Text>
        </View>
        
        <View style={common.mainArea}>
          {questionsLoading && <Spinner/>}
          {!questionsLoading && questions.map((q, i) => {
            return (
              <View style={question.container} key={i}>
                <Text style={question.text}>{q.text}</Text>);
                <RecordButton>

                </RecordButton>
              </View>
            );
          })}
          {/* <Text>¿Qué hay que hacer en tu pueblo/ciudad/vecindario?</Text>
          <AudioRecorder upload={this.upload} />
          {isUploading && <Text>Currently uploading...</Text>}
          {uploadStatus === 'failure' && <Text>Something went wrong</Text>}
          {uploadStatus === 'success' && <Text>Hurrah! We uploaded your file. </Text>}
          <Button title="download" onPress={this.downloadAudioFile}/> */}
        </View>
      </View>
    );
  }

  static propTypes = {
    user: PropTypes.object,
    uploadToS3: PropTypes.func.isRequired,
    uploadStatus: PropTypes.string,
    isUploading: PropTypes.bool.isRequired,
    questions: PropTypes.array.isRequired,
    fetchQuestions: PropTypes.func.isRequired,
    questionsLoading: PropTypes.bool.isRequired,
  }
}

const mapStateToProps = ({ auth, content }) => ({
  user: auth.user,
  isUploading: content.isUploading,
  uploadStatus: content.uploadStatus,
  questions: content.questions,
  questionsLoading: content.questionsLoading,
});

const mapDispatchToProps = (dispatch) => ({
  uploadToS3: (uri, idToken) => {
    dispatch(uploadToS3(uri, idToken));
  },
  fetchQuestions: () => {
    dispatch(fetchQuestions());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Practice);
