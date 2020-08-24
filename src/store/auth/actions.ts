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
  }
}

export const adminLogout = () => async (
  dispatch: (arg0: { type: string; payload: any }) => void
) => {
  try {
    const adminLogoutAPI = await fetch('...')
    const data = await adminLogoutAPI.json()
    dispatch({ type: ADMIN_LOGOUT, payload: data })
  } catch (err) {
    console.log(err)
  }
}
