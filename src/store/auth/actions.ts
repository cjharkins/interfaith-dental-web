import { LoginData, ADMIN_LOGIN, ADMIN_LOGOUT } from './types';

export const adminLogin = (loginData: LoginData) => async (
    dispatch: (arg0: { type: string; payload: any }) => void
) => {
    try {
        const adminLoginAPI = await fetch('...', {
            method: 'POST',
            headers: { 'content-type': 'application/json'},
            body: JSON.stringify(loginData)
        });
        const data = await adminLoginAPI.json();
        dispatch({ type: ADMIN_LOGIN, payload: data })
    } catch (err) {
        console.log(err)
    }
};


export const adminLogout = () => async (
    dispatch: (arg0: { type: string; payload: any }) => void
) => {
    try {
        const adminLogoutAPI = await fetch('...');
        const data = await adminLogoutAPI.json();
        dispatch({ type: ADMIN_LOGOUT, payload: data })
    } catch (err) {
        console.log(err)
    }
};