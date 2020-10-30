import { QUESTIONS_COMPLETE, QUESTIONS_LENGTH, INFORMATION, COVERED_COUNTY } from './types'

export const updateCount = (currentCount: number | undefined = 0) => (
  dispatch: (arg0: { type: string; payload: any }) => void
) => {
  const updateCount = currentCount++
  dispatch({ type: QUESTIONS_COMPLETE, payload: updateCount })
}
export const fullQuestionLength = (count: number | undefined = 0) => (
  dispatch: (arg0: { type: string; payload: any }) => void
) => {

  dispatch({ type: QUESTIONS_LENGTH, payload: count })
}

export const updateMessage = (
  message: string | undefined = '',
  qualified: boolean | undefined
) => (dispatch: (arg0: { type: string; payload: any }) => void) => {
  dispatch({ type: INFORMATION, payload: { message, qualified } })
}
export const setIsCountyCovered = (message: boolean) => (
  dispatch: (arg0: { type: string; payload: any }) => void
) => {
  dispatch({ type: COVERED_COUNTY, payload: message })
}
