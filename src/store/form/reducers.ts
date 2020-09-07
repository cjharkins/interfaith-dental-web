import {
  FormState,
  GET_QUESTIONS,
  ADD_ANSWERS_TO_ARRAY,
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
    case ADD_ANSWERS_TO_ARRAY:
      return {
        ...state,
        ...payload,
      }
    default:
      return state
  }
}
