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
  UserActionTypes,
  DestinationActionTypes,
  MapActionTypes,
  AppState,
  User,
  FavouriteDestination,
  UPDATE_FAVOURITES,
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

export function updateFavouriteDestination(
  userId: string,
  newFavourites: FavouriteDestination[]
): ThunkAction<void, RootState, unknown, Action> {
  return (dispatch) => {
    axios
      .put(`${BASE_URL}/user/favourites/${userId}`, {
        favourites: newFavourites,
      })
      .then(() => {
        dispatch({
          type: UPDATE_FAVOURITES,
          favourites: newFavourites,
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

export function bookMoto(appState: AppState): MapActionTypes {
  return {
    type: BOOK_MOTO,
  };
}

export function getAllMotos(): ThunkAction<void, RootState, unknown, Action> {
  return (dispatch) => {
    axios
      .post(`${BASE_URL}/map`, {
        username: 'Ewa',
        destination: 'Carrer del Marquès de Sentmenat, 75, 08029 Barcelona',
      })
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
