export interface UIState {
  informationType: informationTypeProps
  questionsComplete: number | undefined
  isCoveredCounty: boolean
  questionLength: number
}
export interface informationTypeProps {
  message: string
  qualified: boolean
}

export const QUESTIONS_COMPLETE = 'QUESTIONS_COMPLETE'
export const QUESTIONS_LENGTH = 'QUESTIONS_LENGTH'
export const INFORMATION = 'INFORMATION'
export const COVERED_COUNTY = 'COVERED_COUNTY'

export interface UIActionTypes {
  type: string
  payload: any
}
