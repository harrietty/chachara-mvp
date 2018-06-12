import React from 'react';
import {createBottomTabNavigator} from 'react-navigation';

import SignIn from './SignIn';
import SignUpStack from './SignUpStack';
import Confirm from './Confirm';

export default createBottomTabNavigator({
  SignIn: SignIn,
  SignUp: SignUpStack,
});
