import { FormState, GET_QUESTIONS, POST_ANSWERS } from './types';

export function getQuestions() {
    fetch('...', {
        method: 'GET'
    })
        .then(res => res.json())
        .then(response => {
        return {
            type: GET_QUESTIONS,
            payload: response
        }
    });
};


export function postAnswers(formData: FormState) {
    fetch('...', {
        method: 'POST'
    })
        .then(res => res.json())
        .then(response => {
        return {
            type: POST_ANSWERS,
            payload: response
        }
    });
};