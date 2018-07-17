import PropTypes from 'prop-types';
import React from 'react';
import { Animated, Text } from 'react-native';

export default class AnimatedSequence extends React.Component {
  state = {
    fadeAnim: new Animated.Value(0)
  }

  componentDidMount() {
    const values = this.props.values.slice();

    let interval = setInterval(() => {
      let value = values.shift();
      this.setState({
        value,
        fadeAnim: new Animated.Value(0)
      });

      Animated.timing(
        this.state.fadeAnim,
        {
          toValue: 1,
          duration: 200,
        }
      ).start(() => {
        if (values.length === 0) {
          clearInterval(interval);
          this.props.onAnimationEnd();
        }
      });
    }, 1500);
  }

  render () {
    return (
      <Animated.View
        style={{
          opacity: this.state.fadeAnim,
          ...this.props.style
        }}
      >
        <Text style={{fontSize: 56, color: 'white', padding: 20}}>
          {this.state.value}
        </Text>
      </Animated.View>
    );
  }

  static propTypes = {
    style: PropTypes.object.isRequired,
    values: PropTypes.array.isRequired,
    onAnimationEnd: PropTypes.func.isRequired,
  }
}