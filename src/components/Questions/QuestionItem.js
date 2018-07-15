import PropTypes from 'prop-types';
import React from 'react';
import { View, Text, ImageBackground } from 'react-native';

export default function QuestionItem (props) {
  return (
    <View style={{height: 160, width: 170, marginBottom: 20, shadowOffset: {width: 2, height: 2}, shadowColor: 'black', shadowOpacity: 0.5, alignItems: 'center', justifyContent: 'center'}}>
      <ImageBackground source={require('../../img/topic-food.jpg')} style={{flex: 1}}>
        <View style={{height: 130, width: 170, backgroundColor: 'white', opacity: 0.8, justifyContent: 'center', padding: 4}}>
          <Text style={{fontFamily: 'AvenirNext-Regular', fontSize: 20}}>
            {props.question.text}
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
}

QuestionItem.propTypes = {
  question: PropTypes.object.isRequired
};
