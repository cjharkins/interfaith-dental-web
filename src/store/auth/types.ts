export interface AuthState {
  loggedIn: boolean
  token: string
  isError: boolean
  error: string
}

export interface LoginData {
  user: string
  password: string
}

export const ADMIN_LOGIN = 'ADMIN_LOGIN'
export const ADMIN_LOGOUT = 'ADMIN_LOGOUT'
export const ADMIN_LOGIN_ERROR = 'ADMIN_LOGIN'
export const ADMIN_LOGOUT_ERROR = 'ADMIN_LOGIN'

interface LoginAuthAction {
  type: typeof ADMIN_LOGIN
  payload: AuthState
}

interface LogoutAuthAction {
  type: typeof ADMIN_LOGOUT
  payload: AuthState
}

interface LoginAuthErrorAction {
  type: typeof ADMIN_LOGIN_ERROR
  payload: AuthState
}

interface LogoutAuthErrorAction {
  type: typeof ADMIN_LOGOUT_ERROR
  payload: AuthState
}

export type AuthActionTypes =
  | LoginAuthAction
  | LogoutAuthAction
  | LoginAuthErrorAction
  | LogoutAuthErrorAction
