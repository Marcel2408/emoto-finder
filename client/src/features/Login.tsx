/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';
import { authenticateUser, getUserData } from '../store/actions';
import { AppState, CurrentUserLocation, STORE_USER_DATA, User } from '../store/types';


interface ILoginProps {}

export const Login: React.FC<ILoginProps> = () => {
  const [username, setUsername] = useState('');
  const [locationInfo, setLocationInfo] = useState(false);
  const [password, setPassword] = useState('');


  const dispatch: any = useDispatch();
  const history = useHistory();
  const isUserAuthenticated = useSelector((state: RootState) =>
    state.user.isAuthenticated);



  useEffect(() => {
    console.log('location>>>>', locationInfo);
  }, []);

  useEffect(() => {
    if (isUserAuthenticated) {
      dispatch(getUserData({
        username,
        latitude: 41.38078806455369,
        longitude: 2.1417923975515394,
      }));
      history.push('/destination');
    }

  }, [isUserAuthenticated]);

  function getUserLocation() {
    const userLocation = {
      latitude: 0,
      longitude: 0
    };
    navigator.geolocation.getCurrentPosition(function (location) {
      console.log('LAT: ', location.coords.latitude);
      console.log('LONG: ', location.coords.longitude);

    });
    console.log('inside gerUserLOc', userLocation);
    // setLocationInfo({
    //   ...locationInfo,
    //   latitude: userLocation.latitude,
    //   longitude: userLocation.longitude
    // });
  }

  function handleSubmit(event: any): void {
    event.preventDefault();
    dispatch(authenticateUser(username));
    // setTimeout(() => dispatch(getUserData({
    //   username,
    //   latitude: 0,
    //   longitude: 0
    // })), 100);
    console.log('submit');

  }

  function handleUsernameChange(event: any) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event: any) {
    setPassword(event.target.value);
    console.log('🚀 ~ file: Login.tsx ~ line 28 ~ password', password);

  }

  function handleLocationPermissionChange(event: any) {
    setLocationInfo(event.target.checked);
    navigator.geolocation.getCurrentPosition((location) => {
      console.log('LAT: ', location.coords.latitude);
      console.log('LONG: ', location.coords.longitude);

    });
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
        <input onChange={handleUsernameChange} type='text' name='username' placeholder='login' />
        <input onChange={handlePasswordChange} type='password' name='password' placeholder='password' />
        <label htmlFor='geo-location'> Allow location services
          <input onChange={handleLocationPermissionChange} type='checkbox' name='geo-location' />
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
