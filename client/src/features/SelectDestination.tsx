/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RootState } from '../store';
import { getUserData, setCurrentDestination } from '../store/actions';
import { AppState, MapActionTypes } from '../store/types';

// todo on useEffect I'm sending {username, current location of user}

interface ISelectDestinationProps {}

export const SelectDestination: React.FC<ISelectDestinationProps> = () => {

  const [isFromClicked, setIsFromClicked] = useState(false);
  const [isOKClicked, setIsOKClicked] = useState(false);
  const [isSubmited, setIsSubmited] = useState(false);
  const [newDestination, setNewDestination] = useState({
    destination: '',
    label: ''
  });

  const history = useHistory();
  const user = useSelector((state: RootState) => state.user);
  const destination = useSelector((state: RootState) => state.destination);
  const dispatch = useDispatch();
  const inputFields = document.getElementsByTagName('input');

  useEffect(() => {
    dispatch(getUserData({ ...user }));
  }, []);


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleSubmit(event: any): void {
    event.preventDefault();
    history.push('/map');
  }


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleOKClick(): void {
    dispatch(setCurrentDestination(newDestination));
    setIsOKClicked(!isOKClicked);
    inputFields[0].value = '';
    inputFields[0].disabled = true;
  }

  function handleChangeClick(): void {
    inputFields[0].value = '';
    setNewDestination({
      destination: '',
      label: '' });
    dispatch(setCurrentDestination(newDestination));
    setIsOKClicked(!isOKClicked);
    inputFields[0].disabled = false;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleFavoutiteClick(event: any): void{
    console.log(event.target.textContent);
    dispatch(setCurrentDestination(newDestination));

  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleCustomDestinationChange(event: any): void {
    setNewDestination(event.target.value);
  }

  return (
    <div>
      <h1>{user.username}</h1>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%'
        }}
      >
        <h1>
          Choose destination
        </h1>
        <div
          style={{
            flexShrink: 0,
            width: '100%'
          }}
        >
          <form onSubmit={handleSubmit}>
            <div
              onClickCapture={() => setIsFromClicked(true)}
              onChange={handleCustomDestinationChange}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%'
              }}
            >
              <input
                type="text"
                placeholder='Example: carrer Sant Miquel 7, Barcelona'
                style={{
                  width: '80%',
                  height: '30px'
                }}
              />
              <button
                disabled={isOKClicked}
                id='OK_button'
                type='button'
                onClick={handleOKClick}
              > OK
              </button>
              {isFromClicked ? (
                <div>
                  <h2>Favourites</h2>
                  {user.favourites && user.favourites.map((favourite) => (
                    <div
                      key={favourite.label}
                    >
                      <div
                        role='button'
                        onClick={handleFavoutiteClick}
                        onKeyDown={handleFavoutiteClick}
                        tabIndex={-1}
                      >
                        {favourite.label}
                      </div>
                      <div
                        role='button'
                        onClick={handleFavoutiteClick}
                        onKeyDown={handleFavoutiteClick}
                        tabIndex={-1}
                      >
                        {favourite.destination}
                      </div>
                    </div>
                  ))}
                </div>) : null}
            </div>
          </form>
        </div>
        <div />
        <div>
          {isOKClicked ? (
            <div>
              <h2>You are heading to:</h2>
              <div key={destination && destination.destination}>
                <h3>{destination && destination.destination}</h3>
              </div>
              <button
                type='button'
                onClick={handleChangeClick}
              > CHANGE
              </button>
            </div>) : null}
        </div>
        <div
          style={{
            paddingTop: '40px'
          }}
        >
          <button
            onClick={() => history.push('/map')}
            type='submit'
          >Take me there
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({

});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapDispatchToProps = (dispatch: React.Dispatch<MapActionTypes>) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SelectDestination);
