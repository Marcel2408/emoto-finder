import axios from 'axios';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '.';
import {
  FavouriteDestination,
  CurrentDestination,
  LOGIN,
  LOGOUT,
  LOAD_MOTOS,
  CHANGE_CURRENT_DESTINATION,
  ADD_FAVOURITE,
  DELETE_FAVOURITE,
  BOOK_MOTO,
  LoginActionTypes,
  DestinationActionTypes,
  FavouritesActionTypes,
  MapActionTypes,
  AppState,
  User,
  Moto,
} from './types';

export const BASE_URL = 'http://localhost:4000';

export function logoutUser(appState: AppState): LoginActionTypes {
  return {
    type: LOGOUT,
    payload: appState,
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

export function addFavouriteDestination(
  favourite: FavouriteDestination
): FavouritesActionTypes {
  return {
    type: ADD_FAVOURITE,
    favourite,
  };
}

// export function deleteFavouriteDestination(
//   favourites: FavouriteDestination
// ): FavouritesActionTypes {
//   return {
//     type: DELETE_FAVOURITE,
//     favourite,
//   };
// }

export function bookMoto(appState: AppState): MapActionTypes {
  return {
    type: BOOK_MOTO,
  };
}

export function getAllMotos(): ThunkAction<void, RootState, unknown, Action> {
  return (dispatch) => {
    axios
      .get(`${BASE_URL}/test`)
      .then((res) => {
        dispatch({
          type: LOAD_MOTOS,
          availableMotos: res.data,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };
}

export function loginUser(): ThunkAction<void, RootState, unknown, Action> {
  return (dispatch) => {
    axios
      .post(`${BASE_URL}/test`)
      .then((res) => {
        dispatch({
          type: LOGIN,
          currentUser: res.data,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };
}
