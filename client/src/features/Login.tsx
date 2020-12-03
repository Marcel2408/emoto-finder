/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';
import { loginUser } from '../store/actions';
import { AppState, LOGIN, User } from '../store/types';


interface ILoginProps {}

export const Login: React.FC<ILoginProps> = () => {
  const [username, setUsername] = useState({ username: '' });

  const dispatch: any = useDispatch();
  const history = useHistory();

  function handleSubmit(event: any): void {
    event.preventDefault();
    // const newUserName = event.target.username.value;
    // setUsername({ username: newUserName });
    dispatch(loginUser(username));
    console.log('submit');
    history.push('/destination');
  }

  function handleChange(event: any) {
    setUsername({ username: event.target.value });
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
        <input onChange={handleChange} type='text' name='username' placeholder='login' />
        <input type='text' name='password' placeholder='password' />
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
  loginUser: (username: User) => dispatch(loginUser(username))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
