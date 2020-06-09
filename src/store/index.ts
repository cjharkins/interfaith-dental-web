import { createStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension';

import { formReducer } from "./form/reducers";
import { authReducer } from "./auth/reducers";
import { testReducer } from "./test/reducers";

const rootReducer = combineReducers({
  auth: authReducer,
  form: formReducer,
  test: testReducer
});

export default function configureStore() {
  const store = createStore(
    rootReducer,
    composeWithDevTools()
  );

  return store;
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
