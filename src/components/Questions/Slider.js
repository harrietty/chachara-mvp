import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import Slider from 'react-native-slider';

export default function CustomSlider (props) {
  return (
    <View style={{width: '80%'}}>
      <Slider
        maximumValue={600}
        minimumValue={30}
        value={120}
        onValueChange={props.updateSpeakingTime}
        trackStyle={{
          height: 10,
          borderRadius: 4,
          backgroundColor: 'white',
          shadowColor: 'green',
          shadowOffset: {width: 0, height: 1},
          shadowRadius: 1,
          shadowOpacity: 0.15,
        }}
        thumbStyle={{
          width: 30,
          height: 30,
          backgroundColor: '#FFDB97',
          borderColor: '#FFA600',
          borderWidth: 8,
          borderRadius: 20,
          shadowColor: 'black',
          shadowOffset: {width: 0, height: 2},
          shadowRadius: 2,
          shadowOpacity: 0.35,
        }}
        step={30}
        minimumTrackTintColor='#FFD17A'
      />
    </View>
  );
}

CustomSlider.propTypes = {
  updateSpeakingTime: PropTypes.func.isRequired,
};
