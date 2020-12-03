/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect, useRef } from 'react';
import { connect, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RootState } from '../store';
import { AppState, MapActionTypes } from '../store/types';


interface ISelectDestinationProps {}

export const SelectDestination: React.FC<ISelectDestinationProps> = () => {

  const [isClicked, setIsClicked] = useState(false);

  const history = useHistory();
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    console.log('AFTER LOGIN', user.favourites);
  }, []);


  function handleCLick(): void {
    console.log('to map');
    history.push('/map');
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        <h1>
          Chose destination
        </h1>
        <div style={{ flexShrink: 0, width: '100%' }}>
          <form>
            <div onClickCapture={() => setIsClicked(true)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
              <input
                type="text"
                // ref={inputReference}
                placeholder='Example: carrer Sant Miquel 7, Barcelona'
                style={{ width: '80%', height: '30px' }}
              />
              {isClicked ? (
                <div>
                  <h2>Favoirites</h2>
                  {user.favourites && user.favourites.map((favourite) => (
                    <div key={favourite.label}>
                      <p> Name: {favourite.label} </p>
                      <p>Address: {favourite.destination}</p>
                    </div>
                  ))}
                </div>) : null}
              <button
                type='submit'
                onClick={handleCLick}
              >Take me there
              </button>
            </div>
          </form>
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
