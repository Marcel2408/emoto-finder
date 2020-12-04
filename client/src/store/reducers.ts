/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
import {
  AppState,
  LOGIN,
  LOGOUT,
  LOAD_MOTOS,
  CHANGE_CURRENT_DESTINATION,
  ADD_FAVOURITE,
  DELETE_FAVOURITE,
  BOOK_MOTO,
  SET_DESTINATION,
  LoginActionTypes,
  FavouritesActionTypes,
  MapActionTypes,
  DestinationActionTypes,
  AUTHENTICATE_USER,
} from './types';

export const initialState: AppState = {
  currentUser: {},
  finalDestination: {},
  currentTrips: [],
  availableMotos: [],
};

export const sessionReducer = (
  state = initialState.currentUser,
  action: LoginActionTypes
): AppState['currentUser'] => {
  switch (action.type) {
    case LOGIN: {
      return {
        ...state,
        ...action.user,
      };
    }
    case AUTHENTICATE_USER: {
      return {
        ...state,
        isAuthenticated: action.isAuthenticated,
      };
    }
    case LOGOUT: {
      return state;
    }
    default:
      return state;
  }
};

export const destinationReducer = (
  state = initialState.finalDestination,
  action: DestinationActionTypes
): AppState['finalDestination'] => {
  switch (action.type) {
    case SET_DESTINATION: {
      return {
        ...state,
        ...action.destination,
      };
    }
    case CHANGE_CURRENT_DESTINATION: {
      // eslint-disable-next-line no-param-reassign
      state = {};
      return state;
    }
    default:
      return state;
  }
};

export const favouritesReducer = (
  state = initialState.currentUser,
  action: FavouritesActionTypes
): AppState['currentUser'] => {
  switch (action.type) {
    case ADD_FAVOURITE: {
      return {
        ...state,
        ...action.favourites,
      };
    }
    case DELETE_FAVOURITE: {
      return {
        ...state,
        ...action.favourites,
      };
    }

    default:
      return state;
  }
};

export const motosReducer = (
  state = initialState.availableMotos,
  action: MapActionTypes
): AppState['availableMotos'] => {
  switch (action.type) {
    case LOAD_MOTOS: {
      // eslint-disable-next-line no-return-assign
      return (state = action.availableMotos);
    }
    case BOOK_MOTO: {
      return state;
    }
    default:
      return state;
  }
};
