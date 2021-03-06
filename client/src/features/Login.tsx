/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import { Switch } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { createStyles, Theme, makeStyles, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import common from '@material-ui/core/colors/common';
import orange from '@material-ui/core/colors/orange';

import { RootState } from '../store';
import { authenticateUser, updateLocationPermission } from '../store/actions';
import { STORE_USER_DATA } from '../store/types';
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

  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const isUserAuthenticated = useSelector((state: RootState) =>
    state.user.isAuthenticated);

  useEffect(() => {
    if (isUserAuthenticated) history.push('/destination');
  }, [isUserAuthenticated]);

  function handleSubmit(event: { preventDefault: () => void; }): void {
    event.preventDefault();
    dispatch(authenticateUser(username));
    dispatch({
      type: STORE_USER_DATA,
      userData: { username, password }
    });

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

  function handleOnFieldFocusChange(field: string, isFocused: boolean) {
    setFieldFocus({ ...fieldFocus, [field]: isFocused });
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
                onFocus={() => handleOnFieldFocusChange('username', true)}
                onBlur={() => handleOnFieldFocusChange('username', false)}
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
                onFocus={() => handleOnFieldFocusChange('password', true)}
                onBlur={() => handleOnFieldFocusChange('password', false)}
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

