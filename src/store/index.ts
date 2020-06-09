import {
  applyMiddleware,
  createStore,
  combineReducers,
} from '@reduxjs/toolkit'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

import { formReducer } from './form/reducers'
import { authReducer } from './auth/reducers'
import { testReducer } from './test/reducers'

const rootReducer = combineReducers({
  auth: authReducer,
  form: formReducer,
  test: testReducer,
})

export default function configureStore() {
  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  )

  return store
}
