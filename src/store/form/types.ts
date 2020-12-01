export interface CustomerAnswers {
  answerSelected: string | string[] | undefined
  questionOrderNumber: number | undefined
}

export interface AnswerObjectProps {
  answerText: string
  answerType: string
  answerDisplayOrder: string
  questionDisplayOrder: string
}

export interface Question {
  answerChoices: AnswerObjectProps[] | undefined
  questionDisplayOrder: number | undefined
  questionText: string | undefined
  questionType: string | undefined
  language: string | undefined
}

export interface FormState {
  questions: Question[]
  answers: CustomerAnswers[]
}

export const GET_QUESTIONS = 'GET_QUESTIONS'
export const ADD_ANSWERS_TO_ARRAY = 'ADD_ANSWERS_TO_ARRAY'
export const UPDATE_QUESTION = 'UPDATE_QUESTION'

interface GetQuestionsAction {
  type: typeof GET_QUESTIONS
  payload: Question
}

interface AddAnswersAction {
  type: typeof ADD_ANSWERS_TO_ARRAY
  payload: CustomerAnswers
}

interface UpdateQuestion {
  type: typeof UPDATE_QUESTION
  payload: Question
}

export type FormActionTypes =
  | GetQuestionsAction
  | AddAnswersAction
  | UpdateQuestion
