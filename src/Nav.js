import PropTypes from 'prop-types';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createBottomTabNavigator } from 'react-navigation';
import Feed from './components/Feed';
import MyRecordings from './components/MyRecordings';
import PracticeStack from './components/PracticeStack';
import Profile from './components/Profile';

const iconForRoutes = {
  'Feed': 'home',
  'Profile': 'user',
  'Practice': 'microphone',
  'Recordings': 'list-ul'
};

const NavComponent = ({ navigation }) => {
  const IconRenderer = ({ tintColor }) => {
    const { routeName } = navigation.state;
    const iconName = iconForRoutes[routeName];
    return <Icon name={iconName} size={25} color={tintColor} />;
  };

  IconRenderer.propTypes = {
    tintColor: PropTypes.string.isRequired,
  };

  return {
    tabBarIcon: IconRenderer,
  };
};

NavComponent.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default createBottomTabNavigator(
  {
    // TODO: put profile back to the end
    Profile: Profile,
    Feed: Feed,
    Practice: PracticeStack,
    Recordings: MyRecordings,
  },
  {
    navigationOptions: NavComponent,
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  }
);
