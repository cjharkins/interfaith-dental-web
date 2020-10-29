import {
  LoginData,
  ADMIN_LOGIN,
  ADMIN_LOGIN_ERROR,
  ADMIN_LOGOUT_ERROR,
  ADMIN_LOGOUT,
} from './types'

export const adminLogin = (loginData: LoginData) => async (
  dispatch: (arg0: { type: string; payload: any }) => void
) => {
  // @PROD API ENDPOINT
  // try {
  //     const adminLoginAPI = await fetch('...', {
  //         method: 'POST',
  //         headers: { 'content-type': 'application/json'},
  //         body: JSON.stringify(loginData)
  //     });
  //     const data = await adminLoginAPI.json();
  //     dispatch({ type: ADMIN_LOGIN, payload: data })
  // } catch (err) {
  //     console.log(err)
  // }

  // @DEV LOCAL TESTING
  const { user, password } = loginData
  if (user !== 'admin') {
    dispatch({
      type: ADMIN_LOGIN_ERROR,
      payload: { isError: true, error: 'No such user' },
    })
  } else if (password !== 'pwd!!!1') {
    dispatch({
      type: ADMIN_LOGIN_ERROR,
      payload: { isError: true, error: 'Incorrect password' },
    })
  } else {
    const now = new Date()
    const token = {
      token: '123abc',
      expires: now.getTime() + 30 * 60000,
    }
    localStorage.setItem('interfaith-token', JSON.stringify(token))
    dispatch({
      type: ADMIN_LOGIN,
      payload: { loggedIn: true, token: '123abc' },
    })
  }
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
