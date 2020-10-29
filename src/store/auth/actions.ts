import {
  LoginData,
  ADMIN_LOGIN,
  ADMIN_LOGIN_ERROR,
  ADMIN_LOGOUT_ERROR,
  ADMIN_LOGOUT,
} from './types'

const serverUrl =
  'https://cors-anywhere.herokuapp.com/https://interfaith-api.bluebunny.systems/api/'

export const adminLogin = (loginData: LoginData) => async (
  dispatch: (arg0: { type: string; payload: any }) => void
) => {
  // @PROD API ENDPOINT
  try {
    const { username, password } = loginData
    if (username !== 'interfaith') {
      dispatch({
        type: ADMIN_LOGIN_ERROR,
        payload: { isError: true, error: 'No such user' },
      })
    } else if (password !== 'goodPasSworD!') {
      dispatch({
        type: ADMIN_LOGIN_ERROR,
        payload: { isError: true, error: 'Incorrect password' },
      })
    } else {
      const adminLoginAPI = await fetch(serverUrl + 'adminusers', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(loginData),
      })
      const data = await adminLoginAPI.json()
      const now = new Date()
      const token = {
        token: '123abc',
        expires: now.getTime() + 30 * 60000,
      }
      localStorage.setItem('interfaith-token', JSON.stringify(token))
      dispatch({
        type: ADMIN_LOGIN,
        payload: { loggedIn: true, token: '123abc', apiKey: data.apiKey },
      })
    }
  } catch (err) {
    console.log(err)
  }

  // @DEV LOCAL TESTING
  // const { user, password } = loginData
  // if (user !== 'admin') {
  //   dispatch({
  //     type: ADMIN_LOGIN_ERROR,
  //     payload: { isError: true, error: 'No such user' },
  //   })
  // } else if (password !== 'pwd!!!1') {
  //   dispatch({
  //     type: ADMIN_LOGIN_ERROR,
  //     payload: { isError: true, error: 'Incorrect password' },
  //   })
  // } else {
  //   const now = new Date()
  //   const token = {
  //     token: '123abc',
  //     expires: now.getTime() + 30 * 60000,
  //   }
  //   localStorage.setItem('interfaith-token', JSON.stringify(token))
  //   dispatch({
  //     type: ADMIN_LOGIN,
  //     payload: { loggedIn: true, token: '123abc' },
  //   })
  // }
}

export const adminLogout = () => async (
  dispatch: (arg0: { type: string; payload: any }) => void
) => {
  try {
    // const adminLogoutAPI = await fetch('...')
    // const data = await adminLogoutAPI.json()
    localStorage.removeItem('interfaith-token')
    dispatch({ type: ADMIN_LOGOUT, payload: { loggedIn: false } })
  } catch (err) {
    console.log(err)
  }
}
