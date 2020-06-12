import {
  applyMiddleware,
  ThunkAction,
  Action,
  createStore,
  combineReducers,
} from '@reduxjs/toolkit'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

import { formReducer } from './form/reducers'
import { authReducer } from './auth/reducers'
import { uiReducer } from './ui/reducers'

const rootReducer = combineReducers({
  auth: authReducer,
  form: formReducer,
  ui: uiReducer,
})

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
)

export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
