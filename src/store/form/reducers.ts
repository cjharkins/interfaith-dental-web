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
      const { answers } = state
      const { questionOrderNumber } = payload
      const isUpdate = answers.some(
        (question) => question.questionOrderNumber === questionOrderNumber
      )
        console.log(answers, payload, state.questions )
      if (isUpdate) {
        const newState = state.answers.filter(
          (someAnswer) => someAnswer.questionOrderNumber !== questionOrderNumber
        )
        return {
          questions: [...state.questions],
          answers: [...newState, payload],
        }
      } else {
        const answerChoices = state.questions.filter(q => q.questionDisplayOrder === payload.questionOrderNumber)[0].answerChoices
        console.log(answerChoices,' choices')
        const selectedAnswerOrderNumber = answerChoices && answerChoices?.length > 0 && answerChoices?.filter(a => a.answerText === payload.answerSelected)[0].answerDisplayOrder || ''
        console.log(selectedAnswerOrderNumber == '1', payload.questionOrderNumber)
        let updatedQuestionList = state.questions
                
        if (payload.questionOrderNumber === 1 && selectedAnswerOrderNumber == '1') {
             updatedQuestionList.splice(1, 3,)
        }
        if (payload.questionOrderNumber === 14 && selectedAnswerOrderNumber == '1') {
          
        }
        
console.log(updatedQuestionList, 'fjiedksljkdsljksdl')
        return {
          questions: [...updatedQuestionList],
          answers: [...state.answers, payload],
        }
      }

    default:
      return state
  }
}

//questions: [...state.questions],
//         answers: [...state.answers, payload],
