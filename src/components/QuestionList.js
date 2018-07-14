import PropTypes from 'prop-types';
import React from 'react';
import { Text, View, AsyncStorage, ImageBackground } from 'react-native';
import { connect } from 'react-redux';

import { fetchQuestions, getQuestionsFromStorage, fetchUserRecordings } from '../actions/content.actions';
import userConfig from '../user-config';

import RecordButton from './RecordButton';
import Spinner from '../reusable/Spinner';
import Error from '../reusable/Error';

import common from '../styles/common';
import question from '../styles/question';
import app from '../stylesNew/app';

class QuestionList extends React.Component {
  static navigationOptions () {
    return {
      title: 'Practice',
    };
  }

  async componentDidMount() {
    console.log('Mounting questionlist');
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
    const { questions, questionsLoading, userRecordingsByQuestionId, error } = this.props;
    if (error) return (
      <Error header='Practice'>{error}</Error>
    );
    else return (
      <ImageBackground source={require('../img/bg-faded.jpg')} style={{flex: 1}}>
        <View style={app.container}>
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
      </ImageBackground>
    );
  }

  static propTypes = {
    user: PropTypes.object,
    questions: PropTypes.object.isRequired,
    error: PropTypes.string,
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
  error: content.loadQuestionsError,
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
