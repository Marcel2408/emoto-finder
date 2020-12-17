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
  locationPermission?: boolean;
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
  creationTime?: number;
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
export const STORE_USER_DESTINATION_COORDINATES =
  'STORE_USER_DESTINATION_COORDINATES';
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
export const UPDATE_LOCATION_PERMISSION = 'UPDATE_LOCATION_PERMISSION';

// action shapes

interface GetUserData {
  type: typeof STORE_USER_DATA;
  userData: User;
}

interface GetUserDestinationCoordinates {
  type: typeof STORE_USER_DESTINATION_COORDINATES;
  destinationCoordinates?: DestinationCoordinates;
}

interface AuthenticateUser {
  type: typeof AUTHENTICATE_USER;
  isAuthenticated: User['isAuthenticated'];
}

interface UpdateLocationPermission {
  type: typeof UPDATE_LOCATION_PERMISSION;
  locationPermission: boolean;
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
  | GetUserDestinationCoordinates
  | AuthenticateUser
  | UpdateLocationPermission
  | LogoutUser
  | UpdateFavourites
  | UpdateFavouritesProviders;
export type DestinationActionTypes = SetDestination | ChangeCurretnDestination;
export type MapActionTypes = BookMoto | GetDestinationCoordinatesAndMotos;
