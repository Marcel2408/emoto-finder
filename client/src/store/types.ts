// global interfaces

export interface User {
  _id?: string;
  name?: string;
  password?: string;
  latitude?: number;
  longitude?: number;
  favourites?: FavouriteDestination[];
}
export interface FavouriteDestination {
  label?: string;
  destination: string;
  latitude: number;
  longitude: number;
}

export interface CurrentDestination {
  destination?: string;
  latitude?: number;
  longitude?: number;
}

export interface CurrentTrip {
  _id?: number;
  latitude: number;
  longitude: number;
  moto_id: string;
  provider: {
    name: string;
  };
  isComing: boolean;
}

export interface Moto {
  id: string;
  publicId: string;
  type: string;
  latitude: number;
  longitude: number;
  provider: {
    name: string;
  };
  battery: number;
}

export interface AppState {
  currentUser: User;
  finalDestination?: CurrentDestination;
  currentTrips?: CurrentTrip[];
  availableMotos?: Moto[];
}

// action constans

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const SET_DESTINATION = 'SET_DESTINATION';
export const LOAD_MOTOS = 'LOAD_MAP';
export const CHANGE_CURRENT_DESTINATION = 'CHANGE_CURRENT_DESTINATION';
export const ADD_FAVOURITE = 'ADD_FAVOURITE';
export const DELETE_FAVOURITE = 'DELETE_FAVOURITE';
export const BOOK_MOTO = 'BOOK_MOTO';

// action shapes

interface LoginUser {
  type: typeof LOGIN;
  currentUser: AppState;
}

interface LogoutUser {
  type: typeof LOGOUT;
  payload: AppState;
}

interface SetDestination {
  type: typeof SET_DESTINATION;
  destination: { destination: string };
}

interface LoadMotos {
  type: typeof LOAD_MOTOS;
  availableMotos: Moto[];
}

interface ChangeCurretnDestination {
  type: typeof CHANGE_CURRENT_DESTINATION;
  destination: CurrentDestination;
}

interface AddFavourite {
  type: typeof ADD_FAVOURITE;
  favourite: FavouriteDestination;
}

interface DeleteFavourite {
  type: typeof DELETE_FAVOURITE;
  favourite: FavouriteDestination;
}

interface BookMoto {
  type: typeof BOOK_MOTO;
}

// using TypeScript's Union Types here to express all possible actions

export type LoginActionTypes = LoginUser | LogoutUser;
export type DestinationActionTypes = SetDestination | ChangeCurretnDestination;
export type FavouritesActionTypes = AddFavourite | DeleteFavourite;
export type MapActionTypes = LoadMotos | BookMoto;
