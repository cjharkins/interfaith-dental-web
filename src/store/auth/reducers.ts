import {
  AuthState,
  ADMIN_LOGIN,
  ADMIN_LOGOUT,
  AuthActionTypes,
  ADMIN_LOGOUT_ERROR,
  ADMIN_LOGIN_ERROR,
  VALIDATION_SUCCESS,
  VALIDATION_FAILURE,
} from './types'

const initialState: AuthState = {
  loggedIn: false,
  token: 'string',
  isError: false,
  error: '',
}

export function authReducer(
  state = initialState,
  { payload, type }: AuthActionTypes
): AuthState {
  switch (type) {
    case ADMIN_LOGIN:
      return {
        ...state,
        ...payload,
      }
    case ADMIN_LOGOUT:
      return {
        ...state,
        ...payload,
      }
    case ADMIN_LOGIN_ERROR:
      return {
        ...state,
        ...payload,
      }
    case ADMIN_LOGOUT_ERROR:
      return {
        ...state,
        ...payload,
      }
    case VALIDATION_SUCCESS:
      return {
        ...state,
        ...payload,
      }
    case VALIDATION_FAILURE:
      return {
        ...state,
        ...payload,
      }
    default:
      return state
  }
}
