import { Button, TextField } from '@material-ui/core';
import * as React from 'react';
import { SetStateAction, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import { RootState } from '../store';
import { updateFavouriteDestination } from '../store/actions';
import { AppState, FavouriteDestination } from '../store/types';

import { FavouriteContainerDiv, FavouriteWrapperDiv, DeleteButton, FavouriteLabelParagraph, FavouriteDestinationParagraph, FavouritesHeader, FavouritesForm, FormFieldWrapper, FormFieldHeader } from './FavouritesStyle';

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
  const handleDeleteClick = (favoriteDestination: FavouriteDestination) => {
    newFavourites = newFavourites.filter(
      (favorite) => favoriteDestination.label !== favorite.label
    );
    dispatch(updateFavouriteDestination(userId, newFavourites));

    // newFavourites.push({ label, destination });
    // dispatch(updateFavouriteDestination(userId, newFavourites));
  };

  const handleInputLabel = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setLabel(e.target.value);
  };

  return (
    <>
      <FavouritesHeader>
        <button
          type='button'
          onClick={() => history.push('/map')}
          style={{
            position: 'absolute',
            height: '100%',
            left: '0',
            top: '0',
            border: 'none',
            backgroundColor: 'transparent',
            padding: '0',
            marginLeft: '.2em' }}
        >
          <ArrowBackIosOutlinedIcon style={{
            color:'white', fontSize: '200%' }}
          />
        </button>
        <span>Favourites
        </span>
      </FavouritesHeader>
      <FavouritesForm>
        <FormFieldWrapper>
          <FormFieldHeader>Label</FormFieldHeader>
          <TextField
            required
            id="standard-required"
            label="Required"
            type="text"
            onChange={handleInputLabel}
            style={{
              width:'100%'
            }}
          />
        </FormFieldWrapper>
        <FormFieldWrapper>
          <FormFieldHeader>Address</FormFieldHeader>
          <TextField
            id="standard-basic"
            label="Required"
            type="text"
            defaultValue={`${destination}`}
            style={{
              width:'100%'
            }}
          />
        </FormFieldWrapper>
        <Button
          onClick={handleLabelClick}
          variant="contained"
          type="button"
          style={{
            backgroundColor:'#ffa40b',
            margin: '1em auto',
            padding: '.5em 2em',
            color: 'white'
          }}
        >
          SAVE
        </Button>
      </FavouritesForm>
      <FavouriteContainerDiv>
        {newFavourites?.map((favoriteDestination) => (
          <FavouriteWrapperDiv key={favoriteDestination.label}>
            <div>
              <StarOutlineIcon style={{ color:'#ffa40b', fontSize: 'medium',  display: 'inline-block', marginRight: '.35em' }} />
              <FavouriteLabelParagraph>
                {favoriteDestination.label}
              </FavouriteLabelParagraph>
              <FavouriteDestinationParagraph>
                {favoriteDestination.destination}
              </FavouriteDestinationParagraph>
            </div>
            <DeleteButton
              type="button"
              onClick={() => handleDeleteClick(favoriteDestination)}
            >
              <DeleteForeverIcon style={{ color:'#303f9f', backgroundColor: 'transparent', border: 'none', display: 'inline-block' }} />
            </DeleteButton>
          </FavouriteWrapperDiv>
        ))}
      </FavouriteContainerDiv>
    </>
  );
};

const mapStateToProps = (state: AppState) => ({});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Favourites);
