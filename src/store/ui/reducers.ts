import {
  UIState,
  UIActionTypes,
  QUESTIONS_COMPLETE,
  INFORMATION,
  COVERED_COUNTY,
} from './types'

const initialState: UIState = {
  informationType: { message: 'welcome', qualified: false },
  questionsComplete: 0,
  isCoveredCounty: false,
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
    case COVERED_COUNTY:
      return {
        ...state,
        isCoveredCounty: payload,
      }
    default:
      return state
  }
}
