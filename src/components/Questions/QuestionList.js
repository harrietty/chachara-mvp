import PropTypes from 'prop-types';
import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

class QuestionList extends React.Component {
  render () {
    const { questions, userRecordingsByQuestionId } = this.props;
    return (
      <View>
        {Object.keys(questions).map((id, i) => {
          let q = questions[id];
          if (!userRecordingsByQuestionId[id]) return (
            <View key={i}>
              <Text>{q.text}</Text>);
            </View>
          );
        })}
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