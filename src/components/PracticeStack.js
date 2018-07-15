import {createStackNavigator} from 'react-navigation';
import QuestionList from './Questions/Main';
import RecordingScreen from './Questions/RecordingScreen';

export default createStackNavigator({
  QuestionList: {
    screen: QuestionList,
    navigationOptions: {
      header: null
    }
  },
  RecordingScreen: RecordingScreen
}, {
  initialRouteName: 'QuestionList'
});