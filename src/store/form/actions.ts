import {
  FormState,
  GET_QUESTIONS,
  ADD_ANSWERS_TO_ARRAY,
  CustomerAnswers,
  FormActionTypes,
} from './types'
const serverUrl =
  'https://cors-anywhere.herokuapp.com/https://interfaith-api.bluebunny.systems/api/'

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
  dispatch: (arg0: { type: string; payload: CustomerAnswers }) => void
) => {
  console.log(questionData)
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
      applicant: {
        id: '', // given by backend?
      },
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
            applicantChoice: {
              answerId: questionOrderNumber,
              text: option,
            },
          }
        })
      return {
        id: questionOrderNumber,
        applicantChoices: [
          ...(multipleAnswers || [
            {
              applicantChoice: {
                answerId: questionOrderNumber,
                text: answerSelected,
              },
            },
          ]),
        ],
      }
    }
  )

  model.form.questions = allAnswersGiven

  fetch(serverUrl + 'form', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(model),
  }).then((res) => {
    console.log(res)
  })
}
