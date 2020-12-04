/* eslint-disable no-return-assign */
import {
  AppState,
  LOGOUT,
  LOAD_MOTOS,
  CHANGE_CURRENT_DESTINATION,
  BOOK_MOTO,
  SET_DESTINATION,
  UserActionTypes,
  MapActionTypes,
  DestinationActionTypes,
  STORE_USER_DATA,
  AUTHENTICATE_USER,
  UPDATE_FAVOURITES,
} from './types';

export const initialState: AppState = {
  currentUser: {
    isAuthenticated: false,
    _id: '',
    username: '',
    password: '',
    latitude: 0,
    longitude: 0,
    favourites: [],
  },
  finalDestination: {
    destination: '',
    latitude: 0,
    longitude: 0,
  },
  currentTrips: [],
  availableMotos: [],
};

export const userReducer = (
  state = initialState.currentUser,
  action: UserActionTypes
): AppState['currentUser'] => {
  switch (action.type) {
    case STORE_USER_DATA: {
      return {
        ...state,
        ...action.userData,
      };
    }
    case AUTHENTICATE_USER: {
      return {
        ...state,
        isAuthenticated: action.isAuthenticated,
      };
    }
    case UPDATE_FAVOURITES: {
      return {
        ...state,
        favourites: action.favourites,
      };
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

export const motosReducer = (
  state = initialState.availableMotos,
  action: MapActionTypes
): AppState['availableMotos'] => {
  switch (action.type) {
    case LOAD_MOTOS: {
      // eslint-disable-next-line no-param-reassign
      return (state = action.availableMotos);
    }
    case BOOK_MOTO: {
      return state;
    }
    default:
      return state;
  }
};
