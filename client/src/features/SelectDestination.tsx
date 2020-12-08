/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';
import { RootState } from '../store';
import { getUserData, setCurrentDestination, getDestinationCoordinatesAndMotos } from '../store/actions';
import { AppState, FavouriteDestination, MapActionTypes } from '../store/types';

import { SelectDestinationContainerDiv, FormWrapper, FavouritesContainerDiv, FavouritesHeader, InputContainerDiv,
  DestinationSummaryContainerDiv, SelectDestinationHeader, FormTag, MainButtonWrapper, InputButton, InputTag, DestinationSummaryHeader,  FavouriteWrapper, FavouriteLabelParagraph, FavouriteDestinationParagraph, ImageContainer, DestinationContentContainer } from './SelectDestinationStyle';

import emotoLogo from '../assets/logos/emotoLogo.svg';

import { Favourites } from './Favourites';

// todo on useEffect I'm sending {username, current location of user}

interface ISelectDestinationProps {}

export const SelectDestination: React.FC<ISelectDestinationProps> = () => {
  const [isFromClicked, setIsFromClicked] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');


  const history = useHistory();
  const user = useSelector((state: RootState) => state.user);
  const destination = useSelector((state: RootState) => state.destination);
  const dispatch = useDispatch();
  const inputFields = document.getElementsByTagName('input');


  useEffect(() => {
    dispatch(getUserData({ ...user }));
    if (destination && destination.destination) {
      setIsClicked(!isClicked);
    }
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleTakeMeThereSubmit(event: any): void {
    event.preventDefault();
    dispatch(getDestinationCoordinatesAndMotos(destination.destination, user.username));
    history.push('/map');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleFavouriteClick(favourite: FavouriteDestination): void{
    inputFields[0].value = favourite.destination;
    setIsVisible(true);
    setIsClicked(true);
    dispatch(setCurrentDestination({ ...favourite }));
  }

  function handleInputChange() {
    if (isVisible) {
      setInputValue(inputFields[0].value = '');
      setIsVisible(!isVisible);
      setIsClicked(!isClicked);
    }
  }

  function handleOKClick() {
    dispatch(setCurrentDestination({ destination: inputFields[0].value, label: '' }));
    if (inputFields[0].value === '') {
      setIsClicked(false);
      return;
    }
    if (isClicked) {
      setInputValue(inputFields[0].value = '');
    }
    setIsVisible(!isVisible);
    setIsClicked(!isClicked);
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
          >
            <InputTag
              type="text"
              placeholder="Eg: Carrer Sant Miquel 7, Barcelona"
              onFocus={handleInputChange}
            />
            <InputButton
              id='OK_button'
              type='button'
              onClick={handleOKClick}
            >
              {isClicked && !isFocused ? <ClearIcon /> : <AddIcon />}
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
                    onClick={() => handleFavouriteClick(favourite)}
                    onKeyDown={() => handleFavouriteClick(favourite)}
                    tabIndex={-1}
                    style={{
                      outline: 'none',
                    }}
                  >
                    <StarOutlineIcon style={{ color:'#ffa40b', fontSize: 'small', display: 'inline-block', marginRight: '.5em' }} />
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
      {isVisible ? (
        <DestinationSummaryContainerDiv>
          <DestinationContentContainer>
            <ImageContainer src={emotoLogo} alt="emoto logo" />
            <div>
              <DestinationSummaryHeader>You are heading to:
              </DestinationSummaryHeader>
              <div key={destination && destination.destination}>
                <p>{destination && destination.destination}</p>
              </div>
            </div>
          </DestinationContentContainer>
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
