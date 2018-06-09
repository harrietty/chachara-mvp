import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import Home from './Home';
import Record from './Record';
import Feed from './Feed';
import Settings from './Settings';
import MyRecordings from './MyRecordings';

export default createBottomTabNavigator(
  {
    Feed: Feed,
    Practice: Record,
    Recordings: MyRecordings,
    Settings: Settings
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
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
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  }
);