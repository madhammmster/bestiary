import { handleActions, createAction } from 'redux-actions';
import {SHOW_FADER, HIDE_FADER} from '../constants';

const defaultState = {
    isVisible: false
};

export const showFader = createAction(SHOW_FADER);
export const hideFader = createAction(HIDE_FADER);


const faderReducer = handleActions(
    {        
        [showFader]: state => ({ ...state, isVisible: true }),
        [hideFader]: state => ({ ...state, isVisible: false })
    },
    defaultState
);

export default faderReducer;

