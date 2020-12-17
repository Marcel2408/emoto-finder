/* eslint-disable no-return-assign */
import {
  AppState,
  CHANGE_CURRENT_DESTINATION,
  BOOK_MOTO,
  SET_DESTINATION,
  UserActionTypes,
  MapActionTypes,
  DestinationActionTypes,
  STORE_USER_DATA,
  AUTHENTICATE_USER,
  UPDATE_LOCATION_PERMISSION,
  UPDATE_FAVOURITES,
  GET_DESTINATION_COORDINATES_AND_MOTOS,
  UPDATE_FAVOURITES_PROVIDERS,
  STORE_USER_DESTINATION_COORDINATES,
} from './types';

export const initialState: AppState = {
  currentUser: {
    isAuthenticated: false,
    _id: '',
    username: '',
    password: '',
    latitude: 0,
    longitude: 0,
    locationPermission: true,
    favourites: [],
    providers: [
      {
        name: 'Acciona',
        isFiltered: false,
      },
      {
        name: 'Avant',
        isFiltered: false,
      },
      {
        name: 'Cityscoot',
        isFiltered: false,
      },
      {
        name: 'Ecooltra',
        isFiltered: false,
      },
      {
        name: 'Gecco',
        isFiltered: false,
      },
      {
        name: 'Iberscot',
        isFiltered: false,
      },
      {
        name: 'OIZ',
        isFiltered: false,
      },
      {
        name: 'SEAT MÓtosharing',
        isFiltered: false,
      },
      {
        name: 'TuCycleBarcelona',
        isFiltered: false,
      },
      {
        name: 'Yego',
        isFiltered: false,
      },
    ],
    destinationCoordinates: {
      destinationLatitude: 0,
      destinationLongitude: 0,
    },
  },
  finalDestination: {
    destination: '',
    label: '',
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
      if (state.isAuthenticated) {
        return {
          ...state,
          ...action.userData,
        };
      }

      return {
        ...state,
        username: action.userData.username,
      };
    }
    case STORE_USER_DESTINATION_COORDINATES: {
      return {
        ...state,
        destinationCoordinates: action.destinationCoordinates,
      };
    }
    case AUTHENTICATE_USER: {
      return {
        ...state,
        isAuthenticated: action.isAuthenticated,
      };
    }
    case UPDATE_LOCATION_PERMISSION: {
      return {
        ...state,
        locationPermission: action.locationPermission,
      };
    }
    case UPDATE_FAVOURITES: {
      return {
        ...state,
        favourites: action.favourites,
      };
    }
    case UPDATE_FAVOURITES_PROVIDERS: {
      return {
        ...state,
        providers: action.providers,
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
      state = { destination: '', label: '' };
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
    case GET_DESTINATION_COORDINATES_AND_MOTOS: {
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
