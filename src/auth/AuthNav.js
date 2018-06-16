import {createBottomTabNavigator} from 'react-navigation';
import SignIn from './SignIn';
import SignUpStack from './SignUpStack';

export default createBottomTabNavigator({
  SignIn: {
    screen: SignIn,
    navigationOptions: {
      tabBarVisible: false,
    }
  },
  SignUp: {
    screen: SignUpStack,
    navigationOptions: {
      tabBarVisible: false,
    }
  },
});
