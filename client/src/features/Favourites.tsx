import { Button } from '@material-ui/core';
import * as React from 'react';
import { useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RootState } from '../store';
import { updateFavouriteDestination } from '../store/actions';
import { AppState, FavouriteDestination } from '../store/types';

interface IFavouritesProps {}

export const Favourites: React.FC<IFavouritesProps> = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [label, setLabel] = useState('');

  const user = useSelector((state: RootState) => state.user);
  const destination = useSelector(
    (state: RootState) => state.destination.destination
  );
  // eslint-disable-next-line no-underscore-dangle
  const userId = user._id;

  let newFavourites: FavouriteDestination[] = [];
  if (user.favourites.length === 0) {
    // eslint-disable-next-line no-const-assign
    newFavourites = [...user.favourites];
  } else {
    newFavourites = [...user.favourites];
  }

  const handleLabelClick = () => {
    newFavourites.push({ label, destination });
    dispatch(updateFavouriteDestination(userId, newFavourites));
  };

  const handleInputLabel = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setLabel(e.target.value);
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
            onChange={handleInputLabel}
          />
        </div>
        <div>
          <h3>Address</h3>
          <input id="label" type="text" placeholder={destination} />
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
      {newFavourites?.map((favoriteDestination) => (
        <div key={favoriteDestination.label}>
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
