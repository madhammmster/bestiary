import { combineReducers } from 'redux';

import app from './appReducer';
import fader from './faderReducer';
import user from './userReducer';
import questions from './questionsReducer';
import recrutations from './recrutationsReducer';

const reducers = {  
  app,
  fader,
  user,
  questions,
  recrutations
};

export default combineReducers(reducers);