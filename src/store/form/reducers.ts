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
  { payload, type }: any
): FormState {
  switch (type) {
    case GET_QUESTIONS:
      return {
        ...state,
        ...payload,
      }
    case ADD_ANSWERS_TO_ARRAY:
      return {
        questions: [...state.questions],
        answers: [...state.answers, payload],
      }
    default:
      return state
  }
}

//questions: [...state.questions],
//         answers: [...state.answers, payload],
