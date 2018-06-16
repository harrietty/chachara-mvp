import { combineReducers } from 'redux';
import auth from './auth';
import content from './content';
import signIn from './signIn';
import signUp from './signUp';
import confirm from './confirm';

export default combineReducers({
  auth,
  signIn,
  signUp,
  content,
  confirm
});