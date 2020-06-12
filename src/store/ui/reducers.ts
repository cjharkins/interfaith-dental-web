import {
  UIState,
  UIActionTypes,
  QUESTIONS_COMPLETE,
  INFORMATION,
} from './types'

const initialState: UIState = {
  informationType: 'welcome',
  questionsComplete: 0,
}

export function uiReducer(
  state = initialState,
  { payload, type }: UIActionTypes
): UIState {
  switch (type) {
    case QUESTIONS_COMPLETE:
      return {
        ...state,
        questionsComplete: payload,
      }
    case INFORMATION:
      return {
        ...state,
        informationType: payload,
      }
    default:
      return state
  }
}
