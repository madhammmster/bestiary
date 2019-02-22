import { handleActions, createAction } from 'redux-actions';
import { SET_QUESTIONS, SET_FILTERS, SET_CURRENT_QUESTION} from '../constants';

const defaultState = {
    questions: null,
    current: null,
    filters: null
};

export const setQuestions = createAction(SET_QUESTIONS);
export const setCurrentQuestion = createAction(SET_CURRENT_QUESTION);
export const setFilters = createAction(SET_FILTERS);


const questionsReducer = handleActions(
    {
        [setQuestions]: (state, action) => ({ ...state, questions: action.payload }),
        [setFilters]: (state, action) => ({ ...state, filters: action.payload }),
        [setCurrentQuestion]: (state, action) => ({ ...state, current: action.payload }),
    },
    defaultState
);

export default questionsReducer;

