import PropTypes from 'prop-types';
import React from 'react';
import { Text, View, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';

import { fetchQuestions, getQuestionsFromStorage } from '../actions/content.actions';
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
    const { questions, questionsLoading } = this.props;
    return (
      <View style={common.container}>
        <View style={common.inAppHeaderArea}>
          <Text style={common.header}>Practice</Text>
        </View>
        
        <View style={common.mainArea}>
          {questionsLoading && <Spinner/>}
          {!questionsLoading && Object.keys(questions).map((id, i) => {
            let q = questions[id];
            return (
              <View style={question.container} key={i}>
                <Text style={question.text}>{q.text}</Text>);
                {q.userHasAnswered ?
                  <Icon name='check' size={25} color='#64D19B'/> :
                  <RecordButton onPress={this.goToChooseLength(q)} />}
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
    fetchQuestions: PropTypes.func.isRequired,
    getQuestionsFromStorage: PropTypes.func.isRequired,
    questionsLoading: PropTypes.bool.isRequired,
    navigation: PropTypes.object.isRequired,
  }
}

const mapStateToProps = ({ auth, content }) => ({
  user: auth.user,
  questions: content.questions,
  questionsLoading: content.questionsLoading,
});

const mapDispatchToProps = (dispatch) => ({
  fetchQuestions: () => {
    dispatch(fetchQuestions());
  },
  getQuestionsFromStorage: () => {
    dispatch(getQuestionsFromStorage());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionList);
