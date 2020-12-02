import { combineReducers, createStore, applyMiddleware } from 'redux';
import loggerMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
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
  applyMiddleware(loggerMiddleware, thunkMiddleware)
);

export type RootState = ReturnType<typeof appReducers>;
