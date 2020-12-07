/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { Autorenew } from '@material-ui/icons';
import { RootState } from '../store';
import { getUserData, setCurrentDestination, getDestinationCoordinatesAndMotos } from '../store/actions';
import { AppState, FavouriteDestination, MapActionTypes } from '../store/types';

import { SelectDestinationContainerDiv, FormWrapper, FavouritesContainerDiv, FavouritesHeader, InputContainerDiv,
  DestinationSummaryContainerDiv, SelectDestinationHeader, FormTag, MainButtonWrapper, InputButton, InputTag, DestinationSummaryHeader,  FavouriteWrapper, FavouriteLabelParagraph, FavouriteDestinationParagraph } from './SelectDestinationStyle';

import { Favourites } from './Favourites';

// todo on useEffect I'm sending {username, current location of user}

interface ISelectDestinationProps {}

export const SelectDestination: React.FC<ISelectDestinationProps> = () => {
  const [isFromClicked, setIsFromClicked] = useState(false);
  // const [isDestinationChosen, setIsDestinationChosen] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [newDestination, setNewDestination] = useState('');

  const history = useHistory();
  const user = useSelector((state: RootState) => state.user);
  const destination = useSelector((state: RootState) => state.destination);
  const dispatch = useDispatch();
  const inputFields = document.getElementsByTagName('input');


  useEffect(() => {
    dispatch(getUserData({ ...user }));
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleTakeMeThereSubmit(event: any): void {
    event.preventDefault();
    console.log('submit to map');

    dispatch(getDestinationCoordinatesAndMotos(destination.destination, user.username));
    history.push('/map');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleOKClick(): void {
    dispatch(setCurrentDestination({ destination: newDestination, label: '' }));
    setIsClicked(!isClicked);

    inputFields[0].value = '';
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleFavoutiteClick(favourite: FavouriteDestination): void{
    dispatch(setCurrentDestination({ ...favourite }));
    setIsClicked(!isClicked);
    // setIsDestinationChosen(!isDestinationChosen);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleCustomDestinationChange(event: any): void {
    setNewDestination(event.target.value);
  }

  return (
    <SelectDestinationContainerDiv>
      <SelectDestinationHeader>Choose destination
      </SelectDestinationHeader>
      <FormWrapper>
        <FormTag
          onSubmit={handleTakeMeThereSubmit}
        >
          <InputContainerDiv
            onClickCapture={() => setIsFromClicked(true)}
            onChange={handleCustomDestinationChange}
          >
            <InputTag
              type="text"
              disabled={isClicked}
              placeholder="Eg: Carrer Sant Miquel 7, Barcelona"
            />
            <InputButton
              id='OK_button'
              type='button'
              onClick={handleOKClick}
            >
              {isClicked ? 'change' : 'add'}
            </InputButton>
            <FavouritesContainerDiv>
              <FavouritesHeader>Favourites</FavouritesHeader>
              {user.favourites && user.favourites.map((favourite) => (
                <FavouriteWrapper
                  key={favourite.label}
                  style={{
                    display:'flex',
                  }}
                >
                  <div
                    role='button'
                    onClick={() => handleFavoutiteClick(favourite)}
                    onKeyDown={() => handleFavoutiteClick(favourite)}
                    tabIndex={-1}
                  >
                    <FavouriteLabelParagraph>
                      {favourite.label}
                    </FavouriteLabelParagraph>
                    <FavouriteDestinationParagraph>
                      {favourite.destination}
                    </FavouriteDestinationParagraph>
                  </div>
                </FavouriteWrapper>
              ))}
            </FavouritesContainerDiv>
          </InputContainerDiv>
        </FormTag>
      </FormWrapper>
      <div />
      {isClicked ? (
        <DestinationSummaryContainerDiv>
          <DestinationSummaryHeader>You are heading to:
          </DestinationSummaryHeader>
          <div key={destination && destination.destination}>
            <h4>{destination && destination.destination}</h4>
          </div>
          <MainButtonWrapper
            onClick={handleTakeMeThereSubmit}
            type="submit"
          >
            Take me there
          </MainButtonWrapper>
        </DestinationSummaryContainerDiv>
      ) : null}
    </SelectDestinationContainerDiv>
  );
};

const mapStateToProps = (state: AppState) => ({});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapDispatchToProps = (dispatch: React.Dispatch<MapActionTypes>) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SelectDestination);
