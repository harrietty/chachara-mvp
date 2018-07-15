import PropTypes from 'prop-types';
import React from 'react';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import QuestionItem from './QuestionItem';

class QuestionList extends React.Component {
  render () {
    const { questions, userRecordingsByQuestionId } = this.props;
    return (
      <View style={{flex: 1}}>
        <ScrollView contentContainerStyle={{flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap'}}>
          {Object.keys(questions).map((id, i) => {
            if (!userRecordingsByQuestionId[id]) {
              return <QuestionItem key={i} question={questions[id]} />;
            }
          })}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = ({ content, userRecordings }) => ({
  questions: content.questions,
  userRecordingsByQuestionId: userRecordings.recordings.reduce((acc, r) => {
    acc[r.question_id] = r;
    return acc;
  }, {})
});

QuestionList.propTypes = {
  questions: PropTypes.object.isRequired,
  userRecordingsByQuestionId: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(QuestionList);