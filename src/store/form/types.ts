export interface Answer {
    answer: string;
}

export interface Question {
    answer: string;
}

export interface FormState {
    questions: Question[];
    answers: Answer[];
}

export const GET_QUESTIONS = 'GET_QUESTIONS';
export const POST_ANSWERS = 'POST_ANSWERS';

interface GetQuestionsAction {
    type: typeof GET_QUESTIONS,
    payload: Question
}

interface PostAnswersAction {
    type: typeof POST_ANSWERS;
    payload: FormState
}

export type FormActionTypes = GetQuestionsAction | PostAnswersAction;