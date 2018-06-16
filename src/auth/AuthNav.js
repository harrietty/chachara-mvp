import {createBottomTabNavigator} from 'react-navigation';
import SignIn from './SignIn';
import SignUpStack from './SignUpStack';

export default createBottomTabNavigator({
  SignIn: SignIn,
  SignUp: SignUpStack,
});
