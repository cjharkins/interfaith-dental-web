export interface AuthState {
    loggedIn: boolean;
    token: string;
}

export interface LoginData {
    user: string;
    password: string;
}

export const ADMIN_LOGIN = 'ADMIN_LOGIN';
export const ADMIN_LOGOUT = 'ADMIN_LOGOUT';

interface LoginAuthAction {
    type: typeof ADMIN_LOGIN;
    payload: AuthState;
}

interface LogoutAuthAction {
    type: typeof ADMIN_LOGOUT;
    payload: AuthState;
}

export type AuthActionTypes = LoginAuthAction | LogoutAuthAction;