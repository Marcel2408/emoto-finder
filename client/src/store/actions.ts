import axios from 'axios';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '.';
import {
  CurrentDestination,
  STORE_USER_DATA,
  LOGOUT,
  LOAD_MOTOS,
  CHANGE_CURRENT_DESTINATION,
  BOOK_MOTO,
  SET_DESTINATION,
  AUTHENTICATE_USER,
  GET_DESTINATION_COORDINATES_AND_MOTOS,
  UserActionTypes,
  DestinationActionTypes,
  MapActionTypes,
  AppState,
  User,
  FavouriteDestination,
  UPDATE_FAVOURITES,
  Provider,
  UPDATE_FAVOURITES_PROVIDERS,
  Moto,
} from './types';

export const BASE_URL = 'http://localhost:4000';

export function authenticateUser(
  username: string
): ThunkAction<void, RootState, unknown, Action> {
  return (dispatch) => {
    axios.post(`${BASE_URL}/user`, { username }).then((res) => {
      dispatch({
        type: AUTHENTICATE_USER,
        isAuthenticated: res.data,
      });
    });
  };
}

export function getUserData(
  userInfo: User
): ThunkAction<void, RootState, unknown, Action> {
  return (dispatch) => {
    axios.put(`${BASE_URL}/user/info`, { ...userInfo }).then((res) => {
      dispatch({
        type: STORE_USER_DATA,
        userData: res.data,
      });
    });
  };
}

export function storeUserLocation(userInfo: User): UserActionTypes {
  return {
    type: STORE_USER_DATA,
    userData: userInfo,
  };
}

export function updateFavouriteDestination(
  userId: string,
  newFavourites: FavouriteDestination[]
): ThunkAction<void, RootState, unknown, Action> {
  return (dispatch) => {
    axios
      .put(`${BASE_URL}/user/favourites/${userId}`, {
        updatedValues: newFavourites,
      })
      .then((res) => {
        dispatch({
          type: UPDATE_FAVOURITES,
          favourites: res.data.favourites,
        });
      });
  };
}
export function updateFavouriteProviders(
  userId: string,
  newFavouritesProviders: Provider[]
): ThunkAction<void, RootState, unknown, Action> {
  return (dispatch) => {
    axios
      .put(`${BASE_URL}/user/providers/${userId}`, {
        updatedValues: newFavouritesProviders,
      })
      .then((res) => {
        dispatch({
          type: UPDATE_FAVOURITES_PROVIDERS,
          providers: res.data.providers,
        });
      });
  };
}

export function logoutUser(appState: AppState): UserActionTypes {
  return {
    type: LOGOUT,
    payload: appState,
  };
}

export function getDestinationCoordinatesAndMotos(
  destination: string,
  username: string
): ThunkAction<void, RootState, unknown, Action> {
  return (dispatch) => {
    axios.post(`${BASE_URL}/map`, { destination, username }).then((res) => {
      dispatch({
        type: GET_DESTINATION_COORDINATES_AND_MOTOS,
        availableMotos: res.data.motos,
      });
      dispatch({
        type: STORE_USER_DATA,
        destinationCoordinates: res.data.destinationCoordinates,
      });
    });
  };
}

export function bookMoto(
  destination: string,
  moto: Moto
): ThunkAction<void, RootState, unknown, Action> {
  return (dispatch) => {
    axios.post(`${BASE_URL}/add-trip`, { destination, moto }).then((res) => {
      console.log('bookMoto response >>>>', res.data);

      dispatch({
        type: BOOK_MOTO,
      });
    });
  };
}

export function setCurrentDestination(
  destination: CurrentDestination
): DestinationActionTypes {
  return {
    type: SET_DESTINATION,
    destination,
  };
}

export function changeCurrentDestination(
  destination: CurrentDestination
): DestinationActionTypes {
  return {
    type: CHANGE_CURRENT_DESTINATION,
    destination,
  };
}

// export function getAllMotos(): ThunkAction<void, RootState, unknown, Action> {
//   return (dispatch) => {
//     axios
//       .post(`${BASE_URL}/map`, {
//         username: 'Ewa',
//         destination: 'Carrer del Marquès de Sentmenat, 75, 08029 Barcelona',
//       })
//       .then((res) => {
//         console.log(res.data);
//         dispatch({
//           type: LOAD_MOTOS,
//           availableMotos: res.data,
//         });
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//   };
// }
