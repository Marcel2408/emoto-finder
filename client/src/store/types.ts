// global interfaces

export interface User {
  _id?: string;
  name?: string;
  password?: string;
  lat?: number;
  lng?: number;
  favourites?: FavDest[];
}

export interface CustomDest {
  destination?: string;
  lat?: number;
  lng?: number;
}

export interface FavDest {
  label?: string;
  destination: string;
  lat: number;
  lng: number;
}

export interface CurrentDest {
  destination?: string;
  lat?: number;
  lng?: number;
}

export interface CurrentTrip {
  _id?: number;
  lat: number;
  lng: number;
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
  lat: number;
  lng: number;
  provider: {
    name: string;
  };
  battery: number;
}

export interface AppState {
  currentUser?: User;
  finalDestination?: CurrentDest;
  customDestination?: CustomDest;
  currentTrips?: CurrentTrip[];
  avbMotos?: Moto[];
}

// action constans

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const GET_CUSTOM_DEST = 'GET_CUSTOM_DEST';
export const USE_FAVOURITE_DEST = 'USE_FAVOURITE_DEST';
export const LOAD_MAP = 'LOAD_MAP';
export const CHANGE_CURRENT_DEST = 'CHANGE_CURRENT_DEST';
export const ADD_FAVOURITE = 'ADD_FAVOURITE';
export const DELETE_FAVOURITE = 'DELETE_FAVOURITE';
export const BOOK_MOTO = 'BOOK_MOTO';

// action shapes

interface LoginUser {
  type: typeof LOGIN;
  payload: AppState;
}

interface LogoutUser {
  type: typeof LOGOUT;
  payload: AppState;
}

interface GetCustomDest {
  type: typeof GET_CUSTOM_DEST;
  payload: CustomDest;
}

interface UseFavDest {
  type: typeof USE_FAVOURITE_DEST;
  payload: FavDest;
}

interface LoadMap {
  type: typeof LOAD_MAP;
  payload: AppState;
}

interface ChangeCurretnDest {
  type: typeof CHANGE_CURRENT_DEST;
  payload: CurrentDest;
}

interface AddFav {
  type: typeof ADD_FAVOURITE;
  payload: FavDest[];
}

interface DeleteFav {
  type: typeof DELETE_FAVOURITE;
  payload: FavDest[];
}

interface BookMoto {
  type: typeof BOOK_MOTO;
  payload: AppState;
}

// using TypeScript's Union Types here to express all possible actions

export type LoginActionTypes = LoginUser | LogoutUser;
export type DestActionTypes = GetCustomDest | UseFavDest | ChangeCurretnDest;
export type FavActionTypes = AddFav | DeleteFav;
export type MapActionTypes = LoadMap | BookMoto;
