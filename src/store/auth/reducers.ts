import {
  AuthState,
  ADMIN_LOGIN,
  ADMIN_LOGOUT,
  AuthActionTypes,
  ADMIN_LOGOUT_ERROR,
  ADMIN_LOGIN_ERROR,
} from './types'

const initialState: AuthState = {
  loggedIn: false,
  token: 'string',
  isError: false,
  error: '',
}

export function authReducer(
  state = initialState,
  action: AuthActionTypes
): AuthState {
  switch (action.type) {
    case ADMIN_LOGIN: {
      return {
        ...state,
        ...action.payload,
      }
    }
    case ADMIN_LOGOUT: {
      return {
        ...state,
        ...action.payload,
      }
    }
    case ADMIN_LOGIN_ERROR: {
      return {
        ...state,
        ...action.payload,
      }
    }
    case ADMIN_LOGOUT_ERROR: {
      return {
        ...state,
        ...action.payload,
      }
    }
    default:
      return state
  }
}
