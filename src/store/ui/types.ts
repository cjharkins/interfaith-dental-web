export interface UIState {
  informationType: string | undefined
  questionsComplete: number | undefined
}

export const QUESTIONS_COMPLETE = 'QUESTIONS_COMPLETE'
export const INFORMATION = 'INFORMATION'

export interface UIActionTypes {
  type: string
  payload: any
}
