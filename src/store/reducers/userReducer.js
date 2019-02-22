import { handleActions, createAction } from 'redux-actions';
import { SET_USER } from '../constants';

const defaultState = {
    user: null
};

export const setUser = createAction(SET_USER);


const userReducer = handleActions(
    {
        [setUser]: (state, action) => ({ ...state, user: action.payload })
    },
    defaultState
);

export default userReducer;

