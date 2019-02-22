import { handleActions, createAction } from 'redux-actions';
import {APP_START} from '../constants';

const defaultState = {
    started: false
};

export const startApp = createAction(APP_START);

const appReducer = handleActions(
    {
        [startApp]: state => ({ ...state, started: true })        
    },
    defaultState
);

export default appReducer;

