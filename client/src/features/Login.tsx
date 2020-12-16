/* eslint-disable no-console */
import { Switch } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { createStyles, Theme, makeStyles, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import common from '@material-ui/core/colors/common';
import orange from '@material-ui/core/colors/orange';

import { RootState } from '../store';
import { authenticateUser, getUserData, storeUserLocation, updateLocationPermission } from '../store/actions';
import { STORE_USER_DATA, User } from '../store/types';
import { Video, LoginDiv, WrapperDiv, FormDiv, LoginButton, Footer } from './LoginStyle';
import video from '../assets/video/background-login-video.mp4';

const theme = createMuiTheme({
  palette: {
    primary: { main: common.white },
    secondary: { main: orange[400] }
  }
});

const useStyles = makeStyles((theme1: Theme) =>
  createStyles({
    margin: {
      margin: theme1.spacing(1),
    },
    textField: {
      width: '25ch',
      height: '3em',
      textColor: 'primary'
    },
    root: {
      '& .MuiInputLabel-formControl': {
        position: 'static'
      }
    },
    input: {
      color: 'white',
      fontWeight: 600,
      fontSize: 20
    }
  })
);

export const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState({ password: '', showPassword: false });
  const locationPermission = useSelector(
    (state: RootState) => state.user.locationPermission);
  const [fieldFocus, setFieldFocus] = useState({
    username: false,
    password: false
  });
  const [userLocation, setUserLocation] = useState({
    latitude: 0,
    longitude: 0
  });

  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const isUserAuthenticated = useSelector((state: RootState) =>
    state.user.isAuthenticated);

  // useEffect(() => {
  //   locationPermission ?
  //     getUserLocation() : console.log('location permission denied');
  // }, [locationPermission]);

  useEffect(() => {
    if (isUserAuthenticated) history.push('/destination');
  }, [isUserAuthenticated]);

  // function getUserLocation() {
  //   navigator.geolocation.getCurrentPosition((location) => {
  //     setUserLocation({
  //       latitude: location.coords.latitude,
  //       longitude: location.coords.longitude
  //     });
  //   }, () => {
  //     if (!locationPermission) alert('Can\'t read location');
  //   }, {
  //     enableHighAccuracy: true,
  //     timeout: 3000,
  //   });
  // }

  function handleSubmit(event: { preventDefault: () => void; }): void {
    event.preventDefault();
    dispatch({
      type: STORE_USER_DATA,
      userData: { username, password }
    });
    dispatch(authenticateUser(username));
    dispatch(storeUserLocation(userLocation));
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

  function handleLocationPermissionChange(
    event: { target: { checked: boolean; }; }) {
    dispatch(updateLocationPermission(event.target.checked));
  }

  function handleOnUsernameFieldFocus() {
    setFieldFocus({ ...fieldFocus, username: true });
  }

  function handleOnUsernameFieldBlur() {
    setFieldFocus({ ...fieldFocus, username: false });
  }

  function handleOnPasswordFieldFocus() {
    setFieldFocus({ ...fieldFocus, password: true });
  }

  function handleOnPasswordFieldBlur() {
    setFieldFocus({ ...fieldFocus, password: false });
  }


  return (
    <WrapperDiv>
      <Video loop autoPlay muted>
        <source src={video} />
      </Video>

      <ThemeProvider theme={theme}>
        <LoginDiv>
          <FormDiv onSubmit={handleSubmit}>
            <FormControl
              className={clsx(
                classes.margin, classes.textField, classes.root
              )}
            >
              <TextField
                inputProps={{ className: classes.input }}
                className={fieldFocus.username ? 'textfield_focus' : null}
                InputLabelProps={{ className: 'textfield_not_focus' }}
                label='Username'
                id='standard-basic'
                type='text'
                onFocus={handleOnUsernameFieldFocus}
                onBlur={handleOnUsernameFieldBlur}
                onChange={handleUsernameChange}
              />
            </FormControl>
            <FormControl
              className={clsx(
                classes.margin, classes.textField, classes.root
              )}
            >
              <TextField
                inputProps={{ className: classes.input }}
                className={fieldFocus.password ? 'textfield_focus' : null}
                label='Password'
                InputLabelProps={{ className: 'textfield_not_focus' }}
                id='standard-basic'
                type='password'
                value={password.password}
                onFocus={handleOnPasswordFieldFocus}
                onBlur={handleOnPasswordFieldBlur}
                onChange={handlePasswordChange}
              />
            </FormControl>
            <WrapperDiv className='location'>
              Allow location services
              <Switch
                onChange={handleLocationPermissionChange}
                type='checkbox'
                name='geo-location'
                required={true}
                checked={locationPermission}
                color='secondary'
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
            </WrapperDiv>
            <LoginButton type='submit' className='login'>
              LOGIN
            </LoginButton>
          </FormDiv>
          <Footer>
            New to eMoto? Create account here.
          </Footer>
        </LoginDiv>
      </ThemeProvider>
    </WrapperDiv>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapDispatchToProps = (dispatch: React.Dispatch<any>) => ({
  getUserData: (userData: User) => dispatch(getUserData(userData)),
  authenticateUser: (username: string) => dispatch(authenticateUser(username)),

});

export default connect(mapDispatchToProps)(Login);
