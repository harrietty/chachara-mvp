import PropTypes from 'prop-types';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import QuestionDetail from '../../reusable/QuestionDetail';
import Slider from './Slider';

import style from '../../stylesNew/app';

export default class RecordingScreen extends React.Component {
  state = {
    speakingTime: 120
  }

  updateSpeakingTime = (value) => {
    this.setState({
      speakingTime: value
    });
  }

  renderTime = () => {
    const time = this.state.speakingTime;
    if (time < 60) return `${time} seconds`;
    else return `${time / 60} minutes`;
  }

  render () {
    const question = this.props.navigation.getParam('question', {});
    return (
      <View style={{backgroundColor: '#A5E8D8', flex: 1, justifyContent: 'space-around', alignItems: 'center'}}>
        <View style={{width: '100%', flex: 3}}>
          <QuestionDetail question={question} />
          <Text style={{fontFamily: 'AvenirNext-UltraLight', fontSize: 44, margin: 10}}>
            {question.text}
          </Text>
        </View>
        <View style={{width: '100%', flex: 1, alignItems: 'center'}}>
          <Slider
            speakingTime={this.state.speakingTime}
            updateSpeakingTime={this.updateSpeakingTime}
          />
          <Text style={{fontSize: 20, fontFamily: 'AvenirNext-UltraLight'}}>
            I want to speak for {this.renderTime()}
          </Text>
        </View>
        <View style={{width: '100%', flex: 3, alignItems: 'center', justifyContent: 'center'}}>
          <TouchableOpacity style={style.largeButtonContainer}>
            <Text style={style.largeButtonText}>
            Go!
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }
}