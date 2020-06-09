import { AuthState, ADMIN_LOGIN, ADMIN_LOGOUT, AuthActionTypes } from './types';

const initialState: AuthState = {
    loggedIn: false,
    token: "string"
};

export function authReducer(
    state = initialState,
    action: AuthActionTypes
): AuthState {
    switch (action.type) {
        case ADMIN_LOGIN: {
            return {
                ...state,
                ...action.payload
            };
        }
        case ADMIN_LOGOUT: {
            return {
                ...state,
                ...action.payload
            };
        }
        default:
            return state;
    }
}