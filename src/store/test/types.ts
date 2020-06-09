export interface Data {
    data: object;
}

export interface TestState {
    data: object
}

export const GET_DATA = 'GET_DATA';

interface GetDataAction {
    type: typeof GET_DATA,
    payload: Data
}

export type TestActionTypes = GetDataAction;