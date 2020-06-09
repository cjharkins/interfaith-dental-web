import {FormState, GET_QUESTIONS, POST_ANSWERS, FormActionTypes} from './types';

const initialState : FormState = {
    questions: [],
    answers: []
};

export function formReducer(state = initialState, action : FormActionTypes) : FormState {
    switch(action.type) {
        case GET_QUESTIONS:
            {
                return {
                    ...state,
                    ...action.payload
                };
            }
        case POST_ANSWERS:
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