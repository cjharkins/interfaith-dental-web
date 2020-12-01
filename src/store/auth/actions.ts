import {
  LoginData,
  ADMIN_LOGIN,
  ADMIN_LOGIN_ERROR,
  ADMIN_LOGOUT_ERROR,
  ADMIN_LOGOUT,
} from './types'
const { v4: uuidv4 } = require('uuid')

const serverUrl =
  'https://cors-anywhere.herokuapp.com/https://interfaith-api.bluebunny.systems/api/'

export const adminLogin = (loginData: LoginData) => async (
  dispatch: (arg0: { type: string; payload: any }) => void
) => {
  try {
    const adminLoginAPI = await fetch(serverUrl + 'adminusers', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(loginData),
    })

    if (adminLoginAPI.status === 401) {
      dispatch({
        type: ADMIN_LOGIN_ERROR,
        payload: { isError: true, error: 'Unauthorized' },
      })
    } else {
      const data = await adminLoginAPI.json()
      const now = new Date()
      const tokenValue = uuidv4()
      const token = {
        token: tokenValue,
        expires: now.getTime() + 30 * 60000,
      }
      localStorage.setItem('interfaith-token', JSON.stringify(token))
      dispatch({
        type: ADMIN_LOGIN,
        payload: { loggedIn: true, token: token, apiKey: data.apiKey },
      })
    }
  } catch (err) {
    dispatch({
      type: ADMIN_LOGIN_ERROR,
      payload: { isError: true, error: err.title },
    })
  }
}

export const adminLogout = () => async (
  dispatch: (arg0: { type: string; payload: any }) => void
) => {
  try {
    localStorage.removeItem('interfaith-token')
    dispatch({ type: ADMIN_LOGOUT, payload: { loggedIn: false } })
  } catch (err) {
    console.log(err)
  }
}
