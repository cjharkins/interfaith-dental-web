export interface TestState {
    data: object | undefined
    fetching: boolean | undefined
}

export const GET_DATA = 'GET_DATA';

export interface AnyAction {
    type: string | undefined
    payload: any | undefined
}
