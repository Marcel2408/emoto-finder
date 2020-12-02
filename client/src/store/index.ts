import { combineReducers, createStore, applyMiddleware } from 'redux';
import loggerMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  sessionReducer,
  finalDestReducer,
  modifyFavourites,
  showMap,
} from './reducers';

const appReducers = combineReducers({
  sessionReducer,
  finalDestReducer,
  modifyFavourites,
  showMap,
});

export const store = createStore(
  appReducers,
  composeWithDevTools(applyMiddleware(loggerMiddleware, thunkMiddleware))
);

export type RootState = ReturnType<typeof appReducers>;
