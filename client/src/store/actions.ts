import axios from 'axios';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '.';
import {
  CustomDest,
  FavDest,
  CurrentDest,
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
  AppState,
  User,
  Moto,
} from './types';

export const BASE_URL = 'http://localhost:4000';

// export function loginUser(user: User): Promise<void> {
//   return (dispatch): Promise<void> => {
//     fetch(`${BASE_URL}/test`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(user),
//     })
//       .then((res) => res.json())
//       .then((resUser) =>
//         dispatch({
//           type: LOGIN,
//           payload: resUser,
//         })
//       )
//       // eslint-disable-next-line no-console
//       .catch((err) => console.error(err));
//   };
//   // return {
//   //   type: LOGIN,
//   //   payload: appState
//   // };
// }

export function logoutUser(appState: AppState): LoginActionTypes {
  return {
    type: LOGOUT,
    payload: appState,
  };
}

export function getCustomDest(destination: CustomDest): DestActionTypes {
  return {
    type: GET_CUSTOM_DEST,
    payload: destination,
  };
}

export function useFavDest(destinaion: FavDest): DestActionTypes {
  return {
    type: USE_FAVOURITE_DEST,
    payload: destinaion,
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
  console.log('getAllMotos');
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
