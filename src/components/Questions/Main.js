import PropTypes from 'prop-types';
import React from 'react';
import { Permissions } from 'expo';
import { AsyncStorage } from 'react-native';
import { connect } from 'react-redux';

import {
  fetchQuestions,
  getQuestionsFromStorage,
  fetchUserRecordings
} from '../../actions/content.actions';
import userConfig from '../../user-config';

import QuestionList from './QuestionList';
import Layout from '../Layout';

class Main extends React.Component {
  state = {
    permissionToRecord: false
  }

  askForPermissionToRecord = async () => {
    const {
      status
    } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    if (status === 'granted') {
      this.setState({
        permissionToRecord: true
      });
    }
  }

  async componentDidMount () {
    await this.askForPermissionToRecord();
    const { LANG } = userConfig;
    const cachedQuestions = JSON.parse(await AsyncStorage.getItem(`QUESTIONS-${LANG}`));
    // const cachedQuestions = null;
    const DAY_SECONDS = 86400;
    if (cachedQuestions && this.getAge(cachedQuestions.time) < DAY_SECONDS) {
      this.props.getQuestionsFromStorage();
    } else {
      this.props.fetchQuestions();
    }

    if (!this.props.recordingsAvailable) {
      this.props.fetchUserRecordings(this.props.user);
    }
  }

  getAge (ms) {
    const s = ms / 1000;
    const today = new Date().getTime() / 1000;
    return today - s;
  }

  goToRecordingScreen = (question) => {
    this.props.navigation.navigate('RecordingScreen', {question});
  }

  render () {
    const { loading, error, recordingsAvailable } = this.props;
    if (this.state.permissionToRecord) return (
      <Layout loading={loading} header='Practice' error={error}>
        {recordingsAvailable && <QuestionList goToRecordingScreen={this.goToRecordingScreen} />}
      </Layout>
    );
    else return null;
  }

  static propTypes = {
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    fetchQuestions: PropTypes.func.isRequired,
    getQuestionsFromStorage: PropTypes.func.isRequired,
    fetchUserRecordings: PropTypes.func.isRequired,
    recordingsAvailable: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired,
  }
}

const mapStateToProps = ({ content, userRecordings, auth }) => ({
  error: content.loadQuestionsError,
  loading: content.questionsLoading,
  recordingsAvailable: userRecordings.recordings.length > 0,
  user: auth.user,
});

const mapDispatchToProps = (dispatch) => ({
  fetchQuestions: () => {
    dispatch(fetchQuestions());
  },
  getQuestionsFromStorage: () => {
    dispatch(getQuestionsFromStorage());
  },
  fetchUserRecordings: (user) => {
    dispatch(fetchUserRecordings(user));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);