import * as types from '../types';

const initialState = {
  data: {
    name: '',
    languages_learning: [],
    languages_spoken: [],
  },
  savingProfile: false,
};

export default (state = initialState, action) => {
  if (action.type === types.FETCH_DB_USER_SUCCESS) {
    return {
      data: {
        name: action.payload.name,
        languages_learning: action.payload.languages_learning,
        languages_spoken: action.payload.languages_spoken
      },
      savingProfile: false,
    };
  }

  if (action.type === types.UPDATE_PROFILE_REQUEST) {
    return {
      data: state.data,
      savingProfile: true,
    };
  }

  if (action.type === types.UPDATE_PROFILE_SUCCESS) {
    return {
      data: {
        name: action.payload.name,
        languages_learning: action.payload.languages_learning,
        languages_spoken: action.payload.languages_spoken,
      },
      savingProfile: false,
    };
  }

  return state;
};
