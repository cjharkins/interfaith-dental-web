import { AuthState, LoginData, ADMIN_LOGIN, ADMIN_LOGOUT } from './types';

export function adminLogin(loginData: LoginData) {
    fetch('...', {
        method: 'POST',
        headers: {
        'content-type': 'application/json'
        },
        body: JSON.stringify(loginData)
    })
        .then(res => res.json())
        .then(response => {
        return {
            type: ADMIN_LOGIN,
            payload: response
        }
    });
};


export function adminLogout() {
    fetch('...')
        .then(res => res.json())
        .then(posts => {
        return {
            type: ADMIN_LOGOUT,
            payload: posts
        }
    });
};