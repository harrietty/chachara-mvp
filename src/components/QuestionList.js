import PropTypes from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

import { fetchQuestions } from '../actions/content.actions';

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

  componentDidMount() {
    this.props.fetchQuestions();
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
          {!questionsLoading && questions.map((q, i) => {
            return (
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
    questions: PropTypes.array.isRequired,
    fetchQuestions: PropTypes.func.isRequired,
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
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionList);
