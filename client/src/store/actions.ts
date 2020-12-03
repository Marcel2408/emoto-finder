import axios from 'axios';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '.';
import {
  FavDest,
  CurrentDest,
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

export function loadMap(motos: Moto[]): MapActionTypes {
  return {
    type: LOAD_MAP,
    payload: motos,
  };
}

export function changeCurrentDest(destinaion: CurrentDest): DestActionTypes {
  return {
    type: CHANGE_CURRENT_DEST,
    payload: destinaion,
  };
}

export function addFavDest(favourites: FavDest[]): FavActionTypes {
  return {
    type: ADD_FAVOURITE,
    payload: favourites,
  };
}

export function deleteFavDest(favourites: FavDest[]): FavActionTypes {
  return {
    type: DELETE_FAVOURITE,
    payload: favourites,
  };
}

export function bookMoto(appState: AppState): MapActionTypes {
  return {
    type: BOOK_MOTO,
    payload: appState,
  };
}

export function getAllMotos(): ThunkAction<void, RootState, unknown, Action> {
  console.log('getAllMotos', process.abort);
  return (dispatch) => {
    console.log('dispatch');
    axios
      .get(`${BASE_URL}/test`)
      .then((res) => {
        dispatch({
          type: LOAD_MAP,
          avbMotos: res.data,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };
}

export function loginUser(): ThunkAction<void, RootState, unknown, Action> {
  console.log('loginUser');
  return (dispatch) => {
    console.log('dispatch');
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
