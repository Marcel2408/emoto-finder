// TODO: create reducers

import { combineReducers } from 'redux';
import { AppState, LOGIN, LOGOUT, GET_CUSTOM_DEST, USE_FAVOURITE_DEST, LOAD_MAP,
  CHANGE_CURRENT_DEST, ADD_FAVOURITE, DELETE_FAVOURITE, BOOK_MOTO,
  LoginActionTypes, DestActionTypes, FavActionTypes, MapActionTypes }
  from './types';

const initialState: AppState = {
  currentUser: {},
  userLocation: {},
  finalDestination: {},
  customDestination: {},
  currentTrips: [],
  avbMotos: []
};

const sessionReducer = (
  state = initialState.currentUser, action: LoginActionTypes
): AppState['currentUser'] => {
  switch (action.type) {
    case LOGIN: {
      return {
        ...state,
        ...action.payload
      };
    }
    case LOGOUT: {
      return {
        ...state,
        ...action.payload
      };
    }
    default:
      return state;
  }
};

const finalDestReducer = (
  state = initialState.finalDestination, action: DestActionTypes
): AppState['finalDestination'] => {
  switch (action.type) {
    case GET_CUSTOM_DEST: {
      return {
        ...state,
        ...action.payload
      };
    }
    case USE_FAVOURITE_DEST: {
      return {
        ...state,
        ...action.payload
      };
    }
    default:
      return state;
  }
};

const reducers = combineReducers({
  sessionReducer,
  finalDestReducer
});

export type RootState = ReturnType<typeof reducers>;