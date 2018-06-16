import React from 'react';
import PropTypes from 'prop-types';
import { createBottomTabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import Record from './Record';
import Feed from './Feed';
import Settings from './Settings';
import MyRecordings from './MyRecordings';

const NavComponent = ({ navigation }) => {
  const IconRenderer = ({ tintColor }) => {
    const { routeName } = navigation.state;
    let iconName;
    if (routeName === 'Feed') {
      iconName = 'home';
    } else if (routeName === 'Settings') {
      iconName = 'cogs';
    } else if (routeName === 'Practice') {
      iconName = 'microphone';
    } else if (routeName === 'Recordings') {
      iconName = 'list-ul';
    }
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
    Feed: Feed,
    Practice: Record,
    Recordings: MyRecordings,
    Settings: Settings,
  },
  {
    navigationOptions: NavComponent,
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  }
);