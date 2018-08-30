import * as actions from '../src/actions/profile.actions';
import {fetchDbUserSuccess }from '../src/actions/auth.actions';
import reducer from '../src/reducers/profile';

describe('profile reducer', () => {
  const initialState = {
    profile: {
      name: '',
      languages_learning: [],
      languages_spoken: [],
    },
    savingProfile: false,
  };

  it('receiving action FETCH_DB_USER_SUCCESS', () => {
    const action = fetchDbUserSuccess({
      name: 'Harriet',
      languages_learning: ['es'],
      languages_spoken: ['eng']
    });
    expect(reducer(initialState, action)).toEqual({
      data: {
        name: 'Harriet',
        languages_learning: ['es'],
        languages_spoken: ['eng']
      },
      savingProfile: false,
    });
  });
  
  it('receiving action UPDATE_PROFILE_REQUEST', () => {
    const action = actions.updateProfileRequest();
    expect(reducer(initialState, action)).toEqual({
      data: {
        name: '',
        languages_learning: [],
        languages_spoken: []
      },
      savingProfile: true,
    });
  });
  
  it('receiving action UPDATE_PROFILE_SUCCESS', () => {
    const action = actions.updateProfileSuccess({
      name: 'Foo',
      languages_learning: ['es'],
      languages_spoken: ['eng']
    });
    expect(reducer(initialState, action)).toEqual({
      data: {
        name: 'Foo',
        languages_learning: ['es'],
        languages_spoken: ['eng']
      },
      savingProfile: false,
    });
  });
});