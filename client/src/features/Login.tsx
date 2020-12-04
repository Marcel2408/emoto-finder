/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RootState } from '../store';
import { authenticateUser, getUserData, storeUserLocation } from '../store/actions';
import { AppState, STORE_USER_DATA, User } from '../store/types';


interface ILoginProps {}

export const Login: React.FC<ILoginProps> = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [locationPermission, setLocationPermission] = useState(false);
  const [userLocation, setUserLocation] = useState({
    latitude: 0,
    longitude: 0
  });

  const dispatch: any = useDispatch();
  const history = useHistory();
  const isUserAuthenticated = useSelector((state: RootState) =>
    state.user.isAuthenticated);


  useEffect(() => {
    locationPermission ?
      getUserLocation() : console.log('location permission denied');
  }, [locationPermission]);

  useEffect(() => {
    if (isUserAuthenticated) {
      dispatch(storeUserLocation(userLocation));
      history.push('/destination');
    }
  }, [isUserAuthenticated]);

  function getUserLocation() {
    navigator.geolocation.getCurrentPosition((location) => {
      console.log('LAT: ', location.coords.latitude);
      console.log('LONG: ', location.coords.longitude);

      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      });
    });
  }

  function handleSubmit(event: any): void {
    event.preventDefault();
    dispatch({
      type: STORE_USER_DATA,
      userData: { username, password }
    });
    dispatch(authenticateUser(username));
  }

  function handleUsernameChange(event: any) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event: any) {
    setPassword(event.target.value);
  }

  function handleLocationPermissionChange(event: any) {
    setLocationPermission(event.target.checked);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          height: '100%'
        }}
      >
        <h1>
          LOGIN
        </h1>
        <input
          onChange={handleUsernameChange}
          type='text'
          name='username'
          placeholder='login'
        />
        <input
          onChange={handlePasswordChange}
          type='password'
          name='password'
          placeholder='password'
        />
        <label
          htmlFor='geo-location'
        > Allow location services
          <input
            onChange={handleLocationPermissionChange}
            type='checkbox'
            name='geo-location'
            required={true}
          />
        </label>
        <button
          type='submit'
        >LOGIN
        </button>
      </div>
    </form>
  );
};

const mapStateToProps = (state: AppState) => ({

});

const mapDispatchToProps = (dispatch: React.Dispatch<any>) => ({
  getUserData: (userData: User) => dispatch(getUserData(userData)),
  authenticateUser: (username: string) => dispatch(authenticateUser(username)),

});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
