/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { connect, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { loginUser } from '../store/actions';
import { AppState, LoginActionTypes } from '../store/types';


interface ILoginProps {}

export const Login: React.FC<ILoginProps> = () => {


  const dispatch: React.Dispatch<any> = useDispatch();
  const history = useHistory();

  function handleCLick(props: any): void {
    console.log('login');
    dispatch(loginUser());
    history.push('/destination');

  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <h1>
        LOGIN
      </h1>
      <button onClick={handleCLick} type='submit'>LOGIN</button>
      {}
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  user: state.currentUser
});

const mapDispatchToProps = (dispatch: React.Dispatch<any>) => ({
  loginUser: () => dispatch(loginUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
