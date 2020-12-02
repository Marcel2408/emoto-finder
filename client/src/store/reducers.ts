import {
  AppState,
  LOGIN,
  LOGOUT,
  GET_CUSTOM_DEST,
  USE_FAVOURITE_DEST,
  LOAD_MAP,
  CHANGE_CURRENT_DEST,
  ADD_FAVOURITE,
  DELETE_FAVOURITE,
  BOOK_MOTO,
  LoginActionTypes,
  DestActionTypes,
  FavActionTypes,
  MapActionTypes,
} from './types';

const initialState: AppState = {
  currentUser: {},
  finalDestination: {},
  customDestination: {},
  currentTrips: [],
  avbMotos: [],
};

export const sessionReducer = (
  state = initialState,
  action: LoginActionTypes
): AppState => {
  switch (action.type) {
    case LOGIN: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case LOGOUT: {
      return state;
    }
    default:
      return state;
  }
};

export const finalDestReducer = (
  state = initialState.finalDestination,
  action: DestActionTypes
): AppState['finalDestination'] => {
  switch (action.type) {
    case GET_CUSTOM_DEST: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case USE_FAVOURITE_DEST: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case CHANGE_CURRENT_DEST: {
      // eslint-disable-next-line no-param-reassign
      state = {};
      return state;
    }
    default:
      return state;
  }
};

export const modifyFavourites = (
  state = initialState.currentUser,
  action: FavActionTypes
): AppState['currentUser'] => {
  switch (action.type) {
    case ADD_FAVOURITE: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case DELETE_FAVOURITE: {
      return {
        ...state,
        ...action.payload,
      };
    }

    default:
      return state;
  }
};

export const showMap = (
  state = initialState,
  action: MapActionTypes
): AppState => {
  switch (action.type) {
    case LOAD_MAP: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case BOOK_MOTO: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
};
