/* eslint-disable react/jsx-curly-newline */
/* eslint-disable no-nested-ternary */
import * as React from 'react';
import { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import ReactMapGL, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useHistory } from 'react-router-dom';
import PinDropIcon from '@material-ui/icons/PinDrop';
import { PulseLoader } from 'react-spinners';
import DirectionsIcon from '@material-ui/icons/Directions';
import FilterListIcon from '@material-ui/icons/FilterList';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { common } from '@material-ui/core/colors';
import {
  GET_DESTINATION_COORDINATES_AND_MOTOS,
  AppState,
  Moto,
} from '../store/types';

import { RootState } from '../store';
import MotoInfo from './MotoInfo';
import {
  ContainerDiv,
  HeaderDiv,
  MapDiv,
  MotoContainerDiv,
  SelectedMotoDiv,
  NormalMotoDiv,
  CircleIcon,
  HeaderRight,
  Pin,
  LoaderMap,
  BestMotoImage,
} from './MapStyle';

import { MotoContainerWrapper } from './MotoInfoStyle';
import HamburgerMenu from './HamburgerMenu';
import { setCurrentDestination } from '../store/actions';

import images from '../assets/images';
import providerStore, { ProviderI } from '../utils/providers';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;
const MAPBOX_STYLE = process.env.REACT_APP_MAPBOX_STYLE;
interface IMapProps {}

const theme = createMuiTheme({
  palette: {
    primary: { main: common.white },
  },
});

export const Map: React.FC<IMapProps> = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [isMotoInfoClicked, setIsMotoInfoClicked] = useState(false);
  const [motoInfo, setMotoInfo] = useState({
    id: '',
    publicId: '',
    type: '',
    latitude: 0,
    longitude: 0,
    provider: {
      name: '',
    },
    battery: 0,
  });

  const [motoIndex, setMotoIndex] = useState(0);
  const [motoProvider, setMotoProvider] = useState({});
  const userStore = useSelector((state: RootState) => state.user);
  const motoStore = useSelector((state: RootState) => state.motos);
  const destinationStore = useSelector((state: RootState) => state.destination);
  const [motosFilteredByProviders, setMotosFilteredByProviders] = useState([]);
  const motoStoreCopy: Moto[] = [...motoStore];
  const [viewport, setViewport] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    latitude: userStore.latitude,
    longitude: userStore.longitude,
    zoom: 16,
  });

  useEffect(() => {
    for (let i = 0; i < motoStoreCopy.length; i++) {
      for (let j = 0; j < userStore.providers.length; j++) {
        if (motoStoreCopy[i].provider.name === userStore.providers[j].name) {
          if (userStore.providers[j].isFiltered) {
            setMotosFilteredByProviders((prev) => [...prev, motoStoreCopy[i]]);
          }
        }
      }
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [motoStore]);
  function handleClickedMoto(
    moto: Moto,
    i: number,
    motoProviderInfo: ProviderI
  ) {
    setIsMotoInfoClicked(true);
    setMotoInfo(moto);
    setMotoIndex(i);
    setMotoProvider(motoProviderInfo);
  }

  function handleClickedScreen() {
    setIsMotoInfoClicked(false);
  }
  const handleChangeDestination = () => {
    dispatch({
      type: GET_DESTINATION_COORDINATES_AND_MOTOS,
      availableMotos: [],
    });
    dispatch(setCurrentDestination({ destination: '', label: '' }));
    setMotosFilteredByProviders([]);
    history.push('/destination');
  };
  const handleChangeProviders = () => {
    setMotosFilteredByProviders([]);
    history.push('/providers');
  };

  if (isLoading) {
    return (
      <LoaderMap>
        <PulseLoader
          css=""
          margin={6}
          size={20}
          color="#303f9f"
          loading={isLoading}
        />
      </LoaderMap>
    );
  }

  return (
    <ContainerDiv>
      <ThemeProvider theme={theme}>
        <HeaderDiv>
          <HamburgerMenu />
          <HeaderRight>
            <CircleIcon color="primary">
              <DirectionsIcon
                color="primary"
                fontSize="large"
                onClick={handleChangeDestination}
              />
            </CircleIcon>
            <CircleIcon>
              <FilterListIcon
                color="primary"
                fontSize="large"
                onClick={handleChangeProviders}
              />
            </CircleIcon>
          </HeaderRight>
        </HeaderDiv>
      </ThemeProvider>
      <MapDiv>
        <ReactMapGL
          {...viewport}
          onClick={() => handleClickedScreen()}
          onViewportChange={(nextViewport) => setViewport(nextViewport)}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          mapStyle={MAPBOX_STYLE}
        >
          <Marker
            latitude={
              userStore.destinationCoordinates &&
              userStore.destinationCoordinates.destinationLatitude
            }
            longitude={
              userStore.destinationCoordinates &&
              userStore.destinationCoordinates.destinationLongitude
            }
          >
            {viewport.zoom > 17 ? <p>{destinationStore.destination}</p> : null}

            <PinDropIcon style={{ width: '30px', height: '30px' }} />
          </Marker>
          <Marker latitude={userStore.latitude} longitude={userStore.longitude}>
            <Pin />
          </Marker>
          {motosFilteredByProviders?.map((moto: Moto, i: number) => {
            const { provider } = moto;
            return (
              <Marker
                key={moto.id}
                latitude={moto.latitude}
                longitude={moto.longitude}
              >
                {i === 0 && !moto.isIncomming ? (
                  <SelectedMotoDiv>
                    {viewport.zoom > 17 ? (
                      <img
                        src={providerStore[provider.name].logo}
                        alt="provider logo"
                        style={{ height: '20px' }}
                      />
                    ) : null}
                    <img
                      src={images.motoRecommended}
                      alt="provider moto"
                      style={{ height: '45px' }}
                      onClickCapture={() =>
                        handleClickedMoto(moto, i, providerStore[provider.name])
                      }
                    />
                  </SelectedMotoDiv>
                ) : i === 0 && moto.isIncomming ? (
                  <NormalMotoDiv>
                    {viewport.zoom > 17 ? (
                      <img
                        src={providerStore[provider.name].logo}
                        alt="provider logo"
                        style={{ height: '20px' }}
                      />
                    ) : null}
                    <img
                      src={images.incommingMoto}
                      alt="provider moto"
                      style={{ height: '30px' }}
                      onClickCapture={() =>
                        handleClickedMoto(moto, i, providerStore[provider.name])
                      }
                    />
                  </NormalMotoDiv>
                ) : i > 0 && !moto.isIncomming ? (
                  <NormalMotoDiv>
                    {viewport.zoom > 17 ? (
                      <img
                        src={providerStore[provider.name].logo}
                        alt="provider logo"
                        style={{ height: '20px' }}
                      />
                    ) : null}
                    <img
                      src={providerStore[provider.name].moto}
                      alt="provider moto"
                      style={{ height: 35 }}
                      onClickCapture={() =>
                        handleClickedMoto(moto, i, providerStore[provider.name])
                      }
                    />
                  </NormalMotoDiv>
                ) : i > 0 && moto.isIncomming ? (
                  <NormalMotoDiv>
                    {viewport.zoom > 17 ? (
                      <img
                        src={providerStore[provider.name].logo}
                        alt="provider logo"
                        style={{ height: '20px' }}
                      />
                    ) : null}
                    <img
                      src={images.incommingMoto}
                      alt="provider logo"
                      style={{ height: 35 }}
                      onClickCapture={() =>
                        handleClickedMoto(moto, i, providerStore[provider.name])
                      }
                    />
                  </NormalMotoDiv>
                ) : null}
              </Marker>
            );
          })}

          {isMotoInfoClicked && (
            <MotoContainerWrapper>
              <MotoContainerDiv>
                {motoIndex === 0 ? (
                  <>
                    <BestMotoImage src={images.lightening} alt="lightening" />
                  </>
                ) : null}
                <MotoInfo
                  moto={motoInfo}
                  motoIndex={motoIndex}
                  motoProvider={motoProvider}
                />
              </MotoContainerDiv>
            </MotoContainerWrapper>
          )}
        </ReactMapGL>
      </MapDiv>
    </ContainerDiv>
  );
};

const mapStateToProps = (state: AppState) => ({
  availableMotos: state.availableMotos,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapDispatchToProps = (dispatch: any) => ({
  // getAllMotos: () => dispatch(getAllMotos()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);
