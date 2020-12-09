/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';
import ReactMapGL, { Marker } from 'react-map-gl';
import PinDropIcon from '@material-ui/icons/PinDrop';
import { PulseLoader } from 'react-spinners';
import { RootState } from '../store';
import {
  getUserData,
  setCurrentDestination,
  getDestinationCoordinatesAndMotos,
} from '../store/actions';
import { AppState, FavouriteDestination, MapActionTypes } from '../store/types';

import {
  SelectDestinationContainerDiv,
  FormWrapper,
  FavouritesContainerDiv,
  FavouritesHeader,
  InputContainerDiv,
  DestinationSummaryContainerDiv,
  SelectDestinationHeader,
  FormTag,
  MainButtonWrapper,
  InputButton,
  InputTag,
  DestinationSummaryHeader,
  FavouriteWrapper,
  FavouriteLabelParagraph,
  FavouriteDestinationParagraph,
  ImageContainer,
  DestinationContentContainer,
  LoaderDestination,
} from './SelectDestinationStyle';
import emotoLogo from '../assets/logos/emotoLogo.svg';

import { Favourites } from './Favourites';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;
const MAPBOX_STYLE = process.env.REACT_APP_MAPBOX_STYLE;

// todo on useEffect I'm sending {username, current location of user}

interface ISelectDestinationProps {}

export const SelectDestination: React.FC<ISelectDestinationProps> = () => {
  const [isFromClicked, setIsFromClicked] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const [inputValue, setInputValue] = useState('');
  const user = useSelector((state: RootState) => state.user);
  const [viewport, setViewport] = useState({
    width: 375,
    height: 280,
    latitude: user.destinationCoordinates.destinationLatitude,
    zoom: 16,
    longitude: user.destinationCoordinates.destinationLongitude,
  });

  const history = useHistory();
  const destination = useSelector((state: RootState) => state.destination);
  const dispatch = useDispatch();
  const inputFields = document.getElementsByTagName('input');

  useEffect(() => {
    dispatch(getUserData({ ...user }));
    if (destination && destination.destination) {
      setIsClicked(!isClicked);
    }
  }, []);

  useEffect(() => {
    setViewport({
      ...viewport,
      latitude: user.destinationCoordinates.destinationLatitude,
      longitude: user.destinationCoordinates.destinationLongitude,
    });
  }, [user.destinationCoordinates]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleTakeMeThereSubmit(event: any): void {
    event.preventDefault();
    history.push('/map');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleFavouriteClick(favourite: FavouriteDestination): void {
    setIsLoaded(false);
    inputFields[0].value = favourite.destination;
    setIsVisible(true);
    setIsClicked(true);
    dispatch(setCurrentDestination({ ...favourite }));
    dispatch(
      getDestinationCoordinatesAndMotos(favourite.destination, user.username)
    );
    setTimeout(() => {
      setIsLoaded(true);
    }, 2500);
  }

  function handleInputChange() {
    if (isVisible) {
      setInputValue((inputFields[0].value = ''));
      setIsVisible(!isVisible);
      setIsClicked(!isClicked);
    }
  }

  function handleOKClick() {
    setIsLoaded(false);
    setTimeout(() => {
      setIsLoaded(true);
    }, 2500);
    dispatch(
      setCurrentDestination({ destination: inputFields[0].value, label: '' })
    );
    dispatch(
      getDestinationCoordinatesAndMotos(inputFields[0].value, user.username)
    );
    if (inputFields[0].value === '') {
      setIsClicked(false);
      return;
    }
    if (isClicked) {
      setInputValue((inputFields[0].value = ''));
    }
    setIsVisible(!isVisible);
    setIsClicked(!isClicked);
  }

  return (
    <SelectDestinationContainerDiv>
      <SelectDestinationHeader>Choose destination</SelectDestinationHeader>
      <FormWrapper>
        <FormTag onSubmit={handleTakeMeThereSubmit}>
          <InputContainerDiv onClickCapture={() => setIsFromClicked(true)}>
            <InputTag
              type="text"
              placeholder="Eg: Carrer Sant Miquel 7, Barcelona"
              onFocus={handleInputChange}
            />
            <InputButton id="OK_button" type="button" onClick={handleOKClick}>
              {isClicked && !isFocused ? <ClearIcon /> : <AddIcon />}
            </InputButton>
            <FavouritesContainerDiv>
              <FavouritesHeader>Favourites</FavouritesHeader>
              {user.favourites &&
                user.favourites.map((favourite) => (
                  <FavouriteWrapper
                    key={favourite.label}
                    style={{
                      display: 'flex',
                    }}
                  >
                    <div
                      role="button"
                      onClick={() => handleFavouriteClick(favourite)}
                      onKeyDown={() => handleFavouriteClick(favourite)}
                      tabIndex={-1}
                      style={{
                        outline: 'none',
                      }}
                    >
                      <StarOutlineIcon
                        style={{
                          color: '#ffa40b',
                          fontSize: 'small',
                          display: 'inline-block',
                          marginRight: '.5em',
                        }}
                      />
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
            {isLoaded ? (
              <ReactMapGL
                {...viewport}
                onViewportChange={(nextViewport) => setViewport(nextViewport)}
                mapboxApiAccessToken={MAPBOX_TOKEN}
                mapStyle={MAPBOX_STYLE}
              >
                <Marker
                  latitude={
                    user.destinationCoordinates.destinationLatitude &&
                    user.destinationCoordinates.destinationLatitude
                  }
                  longitude={
                    user.destinationCoordinates.destinationLongitude &&
                    user.destinationCoordinates.destinationLongitude
                  }
                >
                  <PinDropIcon style={{ width: '30px', height: '30px' }} />
                </Marker>
              </ReactMapGL>
            ) : (
              <LoaderDestination>
                <PulseLoader
                  css=""
                  margin={6}
                  size={10}
                  color="#303f9f"
                  loading={!isLoaded}
                />
              </LoaderDestination>
            )}
          </DestinationContentContainer>
          <MainButtonWrapper onClick={handleTakeMeThereSubmit} type="submit">
            TAKE ME THERE
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
