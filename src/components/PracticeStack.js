import {createStackNavigator} from 'react-navigation';
import QuestionList from './QuestionList';
import ChooseLength from './ChooseLength';
import Playback from './Playback';

export default createStackNavigator({
  QuestionList: QuestionList,
  ChooseLength: ChooseLength,
  Playback: Playback
}, {
  initialRouteName: 'QuestionList',
  headerMode: 'none',
});