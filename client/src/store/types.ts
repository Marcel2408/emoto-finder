// global interfaces

export interface User {
  isAuthenticated?: boolean;
  _id?: string;
  username?: string;
  password?: string;
  latitude?: number;
  longitude?: number;
  favourites?: FavouriteDestination[];
  providers?: Provider[];
  destinationCoordinates?: DestinationCoordinates;
}
export interface DestinationCoordinates {
  destinationLatitude: number;
  destinationLongitude: number;
}
export interface FavouriteDestination {
  label: string;
  destination: string;
}
export interface Provider {
  name: string;
  isFiltered: boolean;
}

export interface CurrentDestination {
  label: string;
  destination?: string;
}

export interface CurrentUserLocation {
  latitude: number;
  longitude: number;
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
  isIncomming?: boolean;
  creationTime?: Date;
  publicId: string | null;
  type: string;
  latitude: number;
  longitude: number;
  provider: {
    name: string;
    app?: {
      android?: string;
      ios?: string;
    };
  };
  battery: number;
  walkTime?: number;
  driveTime?: number | null;
  totalTravelTime?: number | null;
}

export interface AppState {
  currentUser: User;
  finalDestination?: CurrentDestination;
  currentTrips?: CurrentTrip[];
  availableMotos?: Moto[];
}

// action constans

export const AUTHENTICATE_USER = 'AUTHENTICATE_USER';
export const STORE_USER_DATA = 'STORE_USER_DATA';
export const LOGOUT = 'LOGOUT';
export const SET_DESTINATION = 'SET_DESTINATION';
export const LOAD_MOTOS = 'LOAD_MAP';
export const CHANGE_CURRENT_DESTINATION = 'CHANGE_CURRENT_DESTINATION';
export const UPDATE_FAVOURITES = 'UPDATE_FAVOURITES';
export const UPDATE_FAVOURITES_PROVIDERS = 'UPDATE_FAVOURITES_PROVIDERS';
export const BOOK_MOTO = 'BOOK_MOTO';
export const GET_DESTINATION_COORDINATES_AND_MOTOS =
  'GET_DESTINATION_COORDINATES_AND_MOTOS';

// action shapes

interface GetUserData {
  type: typeof STORE_USER_DATA;
  userData: User;
  destinationCoordinates?: DestinationCoordinates;
}

interface AuthenticateUser {
  type: typeof AUTHENTICATE_USER;
  isAuthenticated: User['isAuthenticated'];
}

interface LogoutUser {
  type: typeof LOGOUT;
  payload: AppState;
}

interface SetDestination {
  type: typeof SET_DESTINATION;
  destination: CurrentDestination;
}

interface GetDestinationCoordinatesAndMotos {
  type: typeof GET_DESTINATION_COORDINATES_AND_MOTOS;
  availableMotos: Moto[];
}

// interface LoadMotos {
//   type: typeof LOAD_MOTOS;
//   availableMotos: Moto[];
// }

interface ChangeCurretnDestination {
  type: typeof CHANGE_CURRENT_DESTINATION;
  destination: CurrentDestination;
}

interface UpdateFavourites {
  type: typeof UPDATE_FAVOURITES;
  favourites: FavouriteDestination[];
}
interface UpdateFavouritesProviders {
  type: typeof UPDATE_FAVOURITES_PROVIDERS;
  providers: Provider[];
}

interface BookMoto {
  type: typeof BOOK_MOTO;
}

// using TypeScript's Union Types here to express all possible actions

export type UserActionTypes =
  | GetUserData
  | AuthenticateUser
  | LogoutUser
  | UpdateFavourites
  | UpdateFavouritesProviders;
export type DestinationActionTypes = SetDestination | ChangeCurretnDestination;
export type MapActionTypes = BookMoto | GetDestinationCoordinatesAndMotos;
