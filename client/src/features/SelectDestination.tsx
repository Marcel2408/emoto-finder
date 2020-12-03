import * as React from 'react';
import { useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RootState } from '../store';
import { AppState, MapActionTypes } from '../store/types';


interface ISelectDestinationProps {

}



export const SelectDestination: React.FC<ISelectDestinationProps> = () => {
  const [isLoading, setIsLoading] = useState(true);

  const history = useHistory();

  useEffect(() => {
    setIsLoading(false);
    console.log('AFTER LOGIN', userName);
  });

  const userName = useSelector((state: RootState) => state.user);

  function handleCLick() {
    console.log('to map');
    history.push('/map');
  }

  if (isLoading) {
    return <div>LOADING...</div>;
  }

  return (
    <div>
      <h1>{userName.name}</h1>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        <h1>
          Chose destination
        </h1>
        <div style={{ flexShrink: 0, width: '100%', paddingLeft: '65px' }}>
          <form>
            <input type="text" placeholder='Example: carrer Sant Miquel 7, Barcelona' style={{ width: '80%', height: '30px' }} />
            <button
              type='submit'
              onClick={handleCLick}
            >Take me there
            </button>
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
