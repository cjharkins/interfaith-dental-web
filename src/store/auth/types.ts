export interface AuthState {
  loggedIn: boolean
  token: string
  isError: boolean
  error: string
  apiKey: string
}

export interface LoginData {
  username: string
  password: string
}

export const ADMIN_LOGIN = 'ADMIN_LOGIN'
export const ADMIN_LOGOUT = 'ADMIN_LOGOUT'
export const ADMIN_LOGIN_ERROR = 'ADMIN_LOGIN'
export const ADMIN_LOGOUT_ERROR = 'ADMIN_LOGIN'
export const VALIDATION_SUCCESS = 'VALIDATION_SUCCESS'
export const VALIDATION_FAILURE = 'VALIDATION_FAILURE'

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

interface ValidationSuccessAction {
  type: typeof VALIDATION_SUCCESS
  payload: AuthState
}

interface ValidationFailureAction {
  type: typeof VALIDATION_FAILURE
  payload: AuthState
}

export type AuthActionTypes =
  | LoginAuthAction
  | LogoutAuthAction
  | LoginAuthErrorAction
  | LogoutAuthErrorAction
  | ValidationSuccessAction
  | ValidationFailureAction
