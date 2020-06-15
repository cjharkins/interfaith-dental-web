import { FormState, GET_QUESTIONS, POST_ANSWERS } from './types'

export const getQuestions = () => async (
  dispatch: (arg0: { type: string; payload: any }) => void
) => {
  try {
    const questionAPI = await fetch('...', { method: 'GET' })
    const data = await questionAPI.json()
    dispatch({ type: GET_QUESTIONS, payload: data })
  } catch (err) {
    console.log(err)
  } finally {
    return
  }
}

export const postAnswers = (formData: FormState) => async (
  dispatch: (arg0: { type: string; payload: any }) => void
) => {
  try {
    const answerAPI = await fetch('...', { method: 'POST' })
    const data = await answerAPI.json()
    dispatch({ type: POST_ANSWERS, payload: data })
  } catch (err) {
    console.log(err)
  } finally {
    return
  }
}
