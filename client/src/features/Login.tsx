/* eslint-disable no-console */
import { Button, IconButton } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import { Visibility, VisibilityOff } from '@material-ui/icons';

import { RootState } from '../store';
import { authenticateUser, getUserData, storeUserLocation } from '../store/actions';
import { AppState, STORE_USER_DATA, User } from '../store/types';
import { Video, LoginDiv, WrapperDiv, FormDiv } from './LoginStyle';
import video from '../video/background-login-video.mp4';



interface ILoginProps {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1),
    },
    textField: {
      width: '25ch',
    },

    color: {
      primary: '#ffff'
    }
  })
);

export const Login: React.FC<ILoginProps> = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState({ password: '', showPassword: false });
  const [locationPermission, setLocationPermission] = useState(false);
  const [userLocation, setUserLocation] = useState({
    latitude: 41.385871,
    longitude: 2.167633
  });

  const classes = useStyles();

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

      // setUserLocation({
      //   latitude: location.coords.latitude,
      //   longitude: location.coords.longitude
      // });
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handlePasswordChange(event: any) {
    setPassword({ ...password, password: event.target.value });
  }

  function handleClickShowPassword() {
    setPassword({ ...password, showPassword: !password.showPassword });
  }

  function handleLocationPermissionChange(
    event: { target: { checked: React.SetStateAction<boolean>; };
    }) {
    setLocationPermission(event.target.checked);
  }

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <>
      <WrapperDiv>
        <Video loop autoPlay muted>
          <source src={video} />
        </Video>
        <LoginDiv>
          <FormDiv onSubmit={handleSubmit}>
            <FormControl
              className={clsx(classes.margin, classes.textField, classes.color)}
            >
              <InputLabel htmlFor="standard-adornment-login">Username</InputLabel>
              <Input
                id="standard-size-normal"
                color='primary'
                type='text'
                onChange={handleUsernameChange}
              />
            </FormControl>
            <FormControl
              className={clsx(classes.margin, classes.textField, classes.color)}
            >
              <InputLabel htmlFor="standard-adornment-password" color='primary'>Password</InputLabel>
              <Input
                id="standard-size-normal"
                type={password.showPassword ? 'text' : 'password'}
                value={password.password}
                onChange={handlePasswordChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {password.showPassword ?
                        <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
            }
              />
            </FormControl>
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
          </FormDiv>
          <Button type='submit' variant='contained' color='default' onClick={handleSubmit}>
            LOGIN
          </Button>
        </LoginDiv>
      </WrapperDiv>
    </>
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
