import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FlagIcon from './FlagIcon';

import style from '../stylesNew/questionList';

export default function QuestionDetail (props) {
  return (
    <View style={style.boxBottom}>
      <Icon name='airplane-takeoff' size={25} color='#FFA600' />;
      <FlagIcon flag={props.question.language} />
    </View>
  );
}

QuestionDetail.propTypes = {
  question: PropTypes.object.isRequired,
};
