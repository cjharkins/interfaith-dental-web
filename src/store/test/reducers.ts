import { TestState, GET_DATA, AnyAction } from './types'

const initialState: TestState = {
  data: {},
  fetching: false,
}

export function testReducer(
  state = initialState,
  action: AnyAction
): TestState {
  switch (action.type) {
    case GET_DATA:
      return {
        ...state,
        data: action.payload,
      }
    case 'FETCHING_POKEMON':
      return { ...state, fetching: action.payload }
    default:
      return state
  }
}
