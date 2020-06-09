import {TestState, GET_DATA, TestActionTypes} from './types';

const initialState : TestState = {
    data: {},
};

export function testReducer(state = initialState, action : TestActionTypes) : TestState {
    switch(action.type) {
        case GET_DATA:
            {
                return {
                    ...state,
                    ...action.payload
                };
            }
        default:
            return state;
    }
}