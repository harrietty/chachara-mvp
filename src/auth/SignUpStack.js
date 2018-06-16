import {createStackNavigator} from 'react-navigation';
import SignUp from './SignUp';
import Confirm from './Confirm';

export default createStackNavigator({
  SignUp: SignUp,
  Confirm: Confirm,
}, {
  initialRouteName: 'SignUp',
  headerMode: 'none',
});