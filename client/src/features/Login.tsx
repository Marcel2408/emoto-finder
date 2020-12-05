/* eslint-disable no-console */
import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RootState } from '../store';
import { authenticateUser, getUserData, storeUserLocation } from '../store/actions';
import { AppState, STORE_USER_DATA, User } from '../store/types';
import { Video } from './LoginStyle';
import { LoginDiv } from './SelectDestinationStyle';
import video from '../../video/SampleVideo_1280x720_1mb.mp4';


interface ILoginProps {}

export const Login: React.FC<ILoginProps> = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [locationPermission, setLocationPermission] = useState(false);
  const [userLocation, setUserLocation] = useState({
    latitude: 0,
    longitude: 0
  });

  const dispatch = useDispatch();
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
  }, [dispatch, history, isUserAuthenticated, userLocation]);

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

  function handleSubmit(event: { preventDefault: () => void; }): void {
    event.preventDefault();
    dispatch({
      type: STORE_USER_DATA,
      userData: { username, password }
    });
    dispatch(authenticateUser(username));
  }

  function handleUsernameChange(
    event: { target: { value: React.SetStateAction<string>; };
    }) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(
    event: { target: { value: React.SetStateAction<string>; };
    }) {
    setPassword(event.target.value);
  }

  function handleLocationPermissionChange(
    event: { target: { checked: React.SetStateAction<boolean>; };
    }) {
    setLocationPermission(event.target.checked);
  }

  return (
    <Video loop autoPlay muted>
      <source src={video} />
      <form onSubmit={handleSubmit}>
        <LoginDiv>
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
          <Button type='submit' variant="contained" color="primary">
            LOGIN
          </Button>
        </LoginDiv>
      </form>
    </Video>
  );
};

const mapStateToProps = (state: AppState) => ({

});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapDispatchToProps = (dispatch: React.Dispatch<any>) => ({
  getUserData: (userData: User) => dispatch(getUserData(userData)),
  authenticateUser: (username: string) => dispatch(authenticateUser(username)),

});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
