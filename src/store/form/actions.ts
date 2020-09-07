import { FormState, GET_QUESTIONS, ADD_ANSWERS_TO_ARRAY, CustomerAnswers } from './types'
const serverUrl =
  'https://cors-anywhere.herokuapp.com/https://interfaith-api.bluebunny.systems/api/'

export const getQuestions = () => async (
  dispatch: (arg0: { type: string; payload: any }) => void
) => {
  try {
    const questionAPI = await fetch(serverUrl + 'forms/english', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
    const data = await questionAPI.json()
    console.log(data, 'data')
    dispatch({ type: GET_QUESTIONS, payload: data })
  } catch (err) {
    console.log(err, 'There was an error.')
  } finally {
    return
  }
}

export const postAnswers = (formData: FormState) => async (
  dispatch: (arg0: { type: string; payload: any }) => void
) => {
  try {
    const answerAPI = await fetch(serverUrl + 'form', {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
    const data = await answerAPI.json()
  } catch (err) {
    console.log(err)
  } finally {
    return
  }
}
export const addAnswersToArray = (questionData: CustomerAnswers) => async (
  dispatch: (arg0: { type: string; payload: any }) => void
) => {
  console.log(questionData)
  dispatch({type: ADD_ANSWERS_TO_ARRAY, payload: questionData})
}
