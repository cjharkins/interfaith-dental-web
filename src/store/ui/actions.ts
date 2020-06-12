import { UIState, QUESTIONS_COMPLETE, INFORMATION } from './types'

export const updateCount = (currentCount: number | undefined = 0) => (
  dispatch: (arg0: { type: string; payload: any }) => void
) => {
  const updateCount = currentCount++
  dispatch({ type: QUESTIONS_COMPLETE, payload: updateCount })
}
