import {
  FormState,
  GET_QUESTIONS,
  POST_ANSWERS,
  FormActionTypes,
} from './types'

const initialState: FormState = {
  questions: [],
  answers: [],
}

export function formReducer(
  state = initialState,
  { payload, type }: FormActionTypes
): FormState {
  switch (type) {
    case GET_QUESTIONS:
      return {
        ...state,
        ...payload,
      }
    case POST_ANSWERS:
      return {
        ...state,
        ...payload,
      }
    default:
      return state
  }
}
