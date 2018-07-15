import PropTypes from 'prop-types';
import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import FlagIcon from '../../reusable/FlagIcon';
import style from '../../stylesNew/questionList';

export default function QuestionItem (props) {
  return (
    <View style={style.itemContainer}>
      <View style={{justifyContent: 'center', flex: 5}}>
        <Text style={style.squareBoxText}>
          {props.question.text}
        </Text>
      </View>
      <View style={style.boxBottom}>
        <Icon name='airplane-takeoff' size={25} color='#FFA600' />;
        <FlagIcon flag='es' />
      </View>
    </View>
  );
}

QuestionItem.propTypes = {
  question: PropTypes.object.isRequired
};
