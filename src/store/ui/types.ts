export interface UIState {
  informationType: string | undefined
  questionsComplete: number | undefined
  isCoveredCounty: boolean 
}

export const QUESTIONS_COMPLETE = 'QUESTIONS_COMPLETE'
export const INFORMATION = 'INFORMATION'
export const COVERED_COUNTY = 'COVERED_COUNTY'

export interface UIActionTypes {
  type: string
  payload: any
}
