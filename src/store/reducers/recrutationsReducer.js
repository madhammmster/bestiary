import { handleActions, createAction } from 'redux-actions';
import { SET_RECRUTATIONS, START_RECRUTATION, END_RECRUTATION, SET_CANDIDATE, SET_CURRENT_RECRUTATIONS } from '../constants';

const defaultState = {
    recrutations: null,
    current: null,
    started: false,
    candidate: {}
};

export const setRecrutations = createAction(SET_RECRUTATIONS);
export const setCurrentRecrutation = createAction(SET_CURRENT_RECRUTATIONS);
export const setCandidate = createAction(SET_CANDIDATE);
export const startRecrutation = createAction(START_RECRUTATION);
export const endRecrutation = createAction(END_RECRUTATION);


const recrutationsReducer = handleActions(
    {
        [setRecrutations]: (state, action) => ({ ...state, recrutations: action.payload }),
        [setCurrentRecrutation]: (state, action) => ({ ...state, current: action.payload }),
        [setCandidate]: (state, action) => ({ ...state, candidate: action.payload }),
        [startRecrutation]: (state) => ({ ...state, started: true }),
        [endRecrutation]: (state) => ({ ...state, started: false, candidate: {} }),
    },
    defaultState
);

export default recrutationsReducer;

