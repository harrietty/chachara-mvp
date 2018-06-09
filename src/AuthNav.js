import React from 'react';
import {createBottomTabNavigator} from 'react-navigation';

import SignIn from './SignIn';
import SignUp from './SignUp';

export default createBottomTabNavigator({
  SignIn: SignIn,
  SignUp: SignUp,
});
