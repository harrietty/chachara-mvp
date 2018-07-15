import PropTypes from 'prop-types';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import QuestionDetail from '../../reusable/QuestionDetail';

import style from '../../stylesNew/questionList';

export default function QuestionItem (props) {
  return (
    <TouchableOpacity onPress={() => props.goToRecordingScreen(props.question)}>
      <View style={style.itemContainer}>
        <View style={{justifyContent: 'center', flex: 5}}>
          <Text style={style.squareBoxText}>
            {props.question.text}
          </Text>
        </View>
        <QuestionDetail question={props.question} />
      </View>
    </TouchableOpacity>
  );
}

QuestionItem.propTypes = {
  question: PropTypes.object.isRequired,
  goToRecordingScreen: PropTypes.func.isRequired,
};
