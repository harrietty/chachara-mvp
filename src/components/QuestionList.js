import PropTypes from 'prop-types';
import React from 'react';
import { Text, View, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';

import { fetchQuestions, getQuestionsFromStorage, fetchUserRecordings } from '../actions/content.actions';
import userConfig from '../user-config';

import RecordButton from './RecordButton';
import Spinner from '../reusable/Spinner';

import common from '../styles/common';
import question from '../styles/question';

class QuestionList extends React.Component {
  static navigationOptions () {
    return {
      title: 'Practice',
    };
  }

  async componentDidMount() {
    const {LANG} = userConfig;
    const cachedQuestions = JSON.parse(await AsyncStorage.getItem(`QUESTIONS-${LANG}`));
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

  goToChooseLength = (question) => () => {
    this.props.navigation.navigate('ChooseLength', {question});
  }

  render () {
    const { questions, questionsLoading, userRecordingsByQuestionId } = this.props;
    return (
      <View style={common.container}>
        <View style={common.inAppHeaderArea}>
          <Text style={common.header}>Practice</Text>
        </View>
        
        <View style={common.mainArea}>
          {questionsLoading && <Spinner/>}
          {!questionsLoading && Object.keys(questions).map((id, i) => {
            let q = questions[id];
            if (!userRecordingsByQuestionId[id]) return (
              <View style={question.container} key={i}>
                <Text style={question.text}>{q.text}</Text>);
                <RecordButton onPress={this.goToChooseLength(q)} />
              </View>
            );
          })}
        </View>
      </View>
    );
  }

  static propTypes = {
    user: PropTypes.object,
    questions: PropTypes.object.isRequired,
    userRecordingsByQuestionId: PropTypes.object.isRequired,
    fetchQuestions: PropTypes.func.isRequired,
    getQuestionsFromStorage: PropTypes.func.isRequired,
    fetchUserRecordings: PropTypes.func.isRequired,
    questionsLoading: PropTypes.bool.isRequired,
    recordingsAvailable: PropTypes.bool.isRequired,
    navigation: PropTypes.object.isRequired,
  }
}

const mapStateToProps = ({ auth, content, userRecordings }) => ({
  user: auth.user,
  questions: content.questions,
  questionsLoading: content.questionsLoading,
  recordingsAvailable: userRecordings.recordings.length > 0,
  userRecordingsByQuestionId: userRecordings.recordings.reduce((acc, r) => {
    acc[r.question_id] = r;
    return acc;
  }, {})
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

export default connect(mapStateToProps, mapDispatchToProps)(QuestionList);
