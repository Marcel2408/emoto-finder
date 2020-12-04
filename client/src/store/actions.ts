import axios from 'axios';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '.';
import {
  FavouriteDestination,
  CurrentDestination,
  STORE_USER_DATA,
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
  SET_DESTINATION,
  AUTHENTICATE_USER,
} from './types';

export const BASE_URL = 'http://localhost:4000';

export function authenticateUser(username: string) {
  return (
    dispatch: (arg0: { type: string; isAuthenticated: boolean }) => void
  ) => {
    axios.post(`${BASE_URL}/user`, { username }).then((res) => {
      dispatch({
        type: AUTHENTICATE_USER,
        isAuthenticated: res.data,
      });
    });
  };
}

export function getUserData(userInfo: User) {
  return (dispatch: (arg0: { type: string; userData: User }) => void) => {
    console.log('starting getUserData >>>>>', userInfo);

    axios.put(`${BASE_URL}/user/info`, { ...userInfo }).then((res) => {
      console.log(
        '🚀 ~ file: actions.ts ~ line 48 ~ axios.put ~ res.data',
        res
      );
      dispatch({
        type: STORE_USER_DATA,
        userData: res.data,
      });
    });
  };
}

export function logoutUser(appState: AppState): LoginActionTypes {
  return {
    type: LOGOUT,
    payload: appState,
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
