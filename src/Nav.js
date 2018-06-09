import React from 'react';
import { createStackNavigator } from 'react-navigation';

import Home from './Home';
import UserProfile from './UserProfile';

export default createStackNavigator(
  {
    Home,
    UserProfile
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerStyle: {
        backgroundColor: 'salmon',
      },
      headerTintColor: '#000',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }
  }
);