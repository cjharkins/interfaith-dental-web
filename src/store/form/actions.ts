import {
  FormState,
  GET_QUESTIONS,
  ADD_ANSWERS_TO_ARRAY,
  CustomerAnswers,
} from './types'
import { QUESTIONS_LENGTH } from '../ui/types'
const serverUrl =
  'https://cors-anywhere.herokuapp.com/https://interfaith-api.bluebunny.systems/api/'
const { v4: uuidv4 } = require('uuid')

export const getQuestions = (language: string) => async (
  dispatch: (arg0: { type: string; payload: any }) => void
) => {
  try {
    const formattedLanguage = language === 'Español' ? 'Spanish' : language
    const questionAPI = await fetch(serverUrl + `forms/${formattedLanguage}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
    const data = await questionAPI.json()

    dispatch({ type: QUESTIONS_LENGTH, payload: data.questions.length })
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
  dispatch: (arg0: { type: string; payload: CustomerAnswers }) => void
) => {
  dispatch({
    type: ADD_ANSWERS_TO_ARRAY,
    payload: questionData,
  })
}

interface PostFormState {
  form: {
    applicant: {
      id: string
    }
    questions: any[]
  }
}

export const handlePostForm = (state: FormState) => {
  const model: any = {
    form: {
      ApplicantId: uuidv4(), // generate using date and applicant last name?
      language: 'English',
      questions: [],
    },
  }

  const allAnswersGiven: any[] = state.answers.map(
    ({ questionOrderNumber, answerSelected }): any => {
      const multipleAnswers =
        answerSelected &&
        Array.isArray(answerSelected) &&
        answerSelected.map((option) => {
          return {
            answerText: option,
          }
        })
      return {
        displayOrder: questionOrderNumber,

        applicantChoices: [
          ...(multipleAnswers || [
            {
              answerText: answerSelected,
            },
          ]),
        ],
      }
    }
  )

  model.form.questions = allAnswersGiven
  fetch(serverUrl + 'forms', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(model.form),
  }).then((res) => {
    console.log(res)
  })
}

export const handleFormUpdate = (state: FormState) => {
    console.log("hit update")
    console.log(state)
}