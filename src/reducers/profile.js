import * as types from '../types';

const initialState = {
  name: '',
  languages_learning: [],
  languages_spoken: [],
};

export default (state = initialState, action) => {
  if (action.type === types.FETCH_DB_USER_SUCCESS) {
    return {
      name: action.payload.name,
      languages_learning: action.payload.languages_learning,
      languages_spoken: action.payload.languages_spoken
    };
  }

  return state;
};
