import {createStackNavigator} from 'react-navigation';
import QuestionList from './QuestionList';
import Record from './Record';
import ChooseLength from './ChooseLength';

export default createStackNavigator({
  QuestionList: QuestionList,
  ChooseLength: ChooseLength,
  Record: Record,
}, {
  initialRouteName: 'QuestionList',
  headerMode: 'none',
});