import * as React from 'react';
import { connect } from 'react-redux';
import { AppState, MapActionTypes } from '../store/types';

interface ISelectDestinationProps {
  name: string | undefined
}



export const SelectDestination: React.FC<ISelectDestinationProps> = ( name) => {

  return (
    <div>
      <h1>{name}</h1>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        <h1>
          Chose destination
        </h1>
        <div style={{ flexShrink: 0, width: '100%', paddingLeft: '65px' }}>
          <form>
            <input type="text" placeholder='Example: carrer Sant Miquel 7, Barcelona' style={{ width: '80%', height: '30px' }} />
            <button type='submit' onClick={() => console.log(name)}>Take me there</button>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  name: state.currentUser.name
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapDispatchToProps = (dispatch: React.Dispatch<MapActionTypes>) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SelectDestination);
