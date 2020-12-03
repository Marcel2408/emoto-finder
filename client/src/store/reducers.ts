import {
  AppState,
  LOGIN,
  LOGOUT,
  LOAD_MAP,
  CHANGE_CURRENT_DEST,
  ADD_FAVOURITE,
  DELETE_FAVOURITE,
  BOOK_MOTO,
  LoginActionTypes,
  DestActionTypes,
  FavActionTypes,
  MapActionTypes,
  SET_DEST,
} from './types';

export const initialState: AppState = {
  currentUser: {},
  finalDestination: {},
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
    case SET_DEST: {
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
