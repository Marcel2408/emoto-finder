
import
{ User, CurrentLocation, CustomDest, FavDest, CurrentDest, CurrentTrip,
  Moto, LOGIN, LOGOUT, GET_CUSTOM_DEST, USE_FAVOURITE_DEST, LOAD_MAP,
  CHANGE_CURRENT_DEST, ADD_FAVOURITE, DELETE_FAVOURITE, BOOK_MOTO,
  LoginActionTypes, DestActionTypes, FavActionTypes, MapActionTypes }
  from './types';

export function loginUser(
  user: User, userLocation: CurrentLocation
): LoginActionTypes {
  return {
    type: LOGIN,
    payload: {
      user,
      userLocation
    }
  };
}

export function logoutUser(user: User): LoginActionTypes {
  return {
    type: LOGOUT,
    payload: user
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

export function loadMap(
  destination: CurrentDest, motos: Moto[], currTrips: CurrentTrip[]
): MapActionTypes {
  return {
    type: LOAD_MAP,
    payload: {
      destination,
      motos,
      currTrips
    }
  };
}

export function changeCurrentDest(): DestActionTypes {
  return {
    type: CHANGE_CURRENT_DEST
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

export function bookMoto(): MapActionTypes {
  return {
    type: BOOK_MOTO
  };
}
