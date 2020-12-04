import { Button } from '@material-ui/core';
import * as React from 'react';
import { FormEvent, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RootState } from '../store';
import { addFavouriteDestination } from '../store/actions';
import { AppState, FavouriteDestination } from '../store/types';

interface IFavouritesProps {}

export const Favourites: React.FC<IFavouritesProps> = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [labelDestination, setLabelDestination] = useState('');
  const [currentDestination, setCurrentDestination] = useState(
    "Carrer d'Avila 27, Barcelona"
  );

  const favourites = useSelector((state: RootState) => state.user.favourites);

  const handleLabelClick = () => {
    console.log('SUBMIT');

    dispatch(
      addFavouriteDestination({
        label: labelDestination,
        destination: currentDestination,
        latitude: 0,
        longitude: 0,
      })
    );
  };

  return (
    <>
      <form>
        <div>
          <h3>Label</h3>
          <input
            id="label"
            type="text"
            placeholder="name destination..."
            onChange={(e) => setLabelDestination(e.target.value)}
          />
        </div>
        <div>
          <h3>Address</h3>
          <input id="label" type="text" placeholder={currentDestination} />
        </div>
        <Button
          onClick={handleLabelClick}
          variant="contained"
          type="button"
          color="primary"
        >
          SAVE
        </Button>
      </form>
      {favourites?.map((favoriteDestination) => (
        <div key={favoriteDestination.latitude}>
          <h2>{favoriteDestination.label}</h2>
          <p>{favoriteDestination.destination}</p>
        </div>
      ))}
      <Button
        variant="contained"
        type="button"
        color="primary"
        onClick={() => history.push('/map')}
      >
        BACK
      </Button>
    </>
  );
};

const mapStateToProps = (state: AppState) => ({});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Favourites);
