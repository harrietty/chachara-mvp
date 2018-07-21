import { combineReducers } from 'redux';
import auth from './auth';
import content from './content';
import signIn from './signIn';
import signUp from './signUp';
import confirm from './confirm';
import userRecordings from './userRecordings';
import profile from './profile';

export default combineReducers({
  auth,
  signIn,
  signUp,
  content,
  confirm,
  userRecordings,
  profile,
});