
import
{ CustomDest, FavDest, CurrentDest, CurrentTrip,
  Moto, LOGIN, LOGOUT, GET_CUSTOM_DEST, USE_FAVOURITE_DEST, LOAD_MAP,
  CHANGE_CURRENT_DEST, ADD_FAVOURITE, DELETE_FAVOURITE, BOOK_MOTO,
  LoginActionTypes, DestActionTypes, FavActionTypes, MapActionTypes, AppState }
  from './types';

export function loginUser(appState: AppState): LoginActionTypes {
  return {
    type: LOGIN,
    payload: appState
  };
}

export function logoutUser(appState: AppState): LoginActionTypes {
  return {
    type: LOGOUT,
    payload: appState
  };
}

export function getCustomDest(destination: CustomDest): DestActionTypes {
  return {
    type: GET_CUSTOM_DEST,
    payload: destination
  };
}

export function useFavDest(destinaion: FavDest): DestActionTypes {
  return {
    type: USE_FAVOURITE_DEST,
    payload: destinaion
  };
}

export function loadMap(appState: AppState): MapActionTypes {
  return {
    type: LOAD_MAP,
    payload: appState
  };
}

export function changeCurrentDest(destinaion: CurrentDest): DestActionTypes {
  return {
    type: CHANGE_CURRENT_DEST,
    payload: destinaion
  };
}

export function addFavDest(favourites: FavDest[]): FavActionTypes {
  return {
    type: ADD_FAVOURITE,
    payload: favourites
  };
}

export function deleteFavDest(favourites: FavDest[]): FavActionTypes {
  return {
    type: DELETE_FAVOURITE,
    payload: favourites
  };
}

export function bookMoto(appState: AppState): MapActionTypes {
  return {
    type: BOOK_MOTO,
    payload: appState
  };
}
