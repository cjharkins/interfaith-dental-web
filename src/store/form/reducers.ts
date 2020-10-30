import { FormState, GET_QUESTIONS, ADD_ANSWERS_TO_ARRAY } from './types'

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
      if (isUpdate) {
        const newState = state.answers.filter(
          (someAnswer) => someAnswer.questionOrderNumber !== questionOrderNumber
        )
        return {
          questions: [...state.questions],
          answers: [...newState, payload],
        }
      } else {
        const currentQuestion = state.questions.filter(
          (q) => q.questionDisplayOrder === payload.questionOrderNumber
        )[0]
        let updatedQuestionList = state.questions
        if (currentQuestion.questionType === 'singleSelect') {
          const answerChoices = state.questions.filter(
            (q) => q.questionDisplayOrder === payload.questionOrderNumber
          )[0].answerChoices
          const selectedAnswerOrderNumber =
            (answerChoices &&
              answerChoices?.length > 0 &&
              answerChoices?.filter(
                (a) => a.answerText === payload.answerSelected
              )[0].answerDisplayOrder) ||
            ''

          if (
            payload.questionOrderNumber === 1 &&
            selectedAnswerOrderNumber == '1'
          ) {
            updatedQuestionList.splice(1, 3)
          }
          if (
            payload.questionOrderNumber === 14 &&
            selectedAnswerOrderNumber == '2'
          ) {
            updatedQuestionList = state.questions.filter(
              (q) => q.questionDisplayOrder !== 15
            )
          }
          if (
            payload.questionOrderNumber === 23 &&
            selectedAnswerOrderNumber == '2'
          ) {
            updatedQuestionList = state.questions.filter(
              (q) =>
                q.questionDisplayOrder !== 24 && q.questionDisplayOrder !== 25
            )
          }
          if (
            payload.questionOrderNumber === 21 &&
            selectedAnswerOrderNumber == '2'
          ) {
            updatedQuestionList = state.questions.filter(
              (q) => q.questionDisplayOrder !== 22
            )
          }
        }

        return {
          questions: [...updatedQuestionList],
          answers: [...state.answers, payload],
        }
      }

    default:
      return state
  }
}
