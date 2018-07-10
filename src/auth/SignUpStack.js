import {createStackNavigator} from 'react-navigation';
import SignUp from './SignUp';
import Confirm from './Confirm';

export default createStackNavigator({
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      header: null
    }
  },
  Confirm: {
    screen: Confirm,
    navigationOptions: {
      headerTransparent: true,
      headerTintColor: '#AFDBDB',
      headerStyle: {
        borderBottomColor: 'transparent',
        elevation: 0
      }
    }
  },
}, {
  initialRouteName: 'SignUp',
});