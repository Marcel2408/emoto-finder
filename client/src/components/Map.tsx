/* eslint-disable react/jsx-curly-newline */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable no-nested-ternary */
import * as React from 'react';
import { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import ReactMapGL, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useHistory } from 'react-router-dom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PinDropIcon from '@material-ui/icons/PinDrop';
import { PulseLoader } from 'react-spinners';
import DirectionsIcon from '@material-ui/icons/Directions';
import FilterListIcon from '@material-ui/icons/FilterList';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { common } from '@material-ui/core/colors';
import {
  AppState,
  GET_DESTINATION_COORDINATES_AND_MOTOS,
  Moto,
} from '../store/types';
import starSVG from '../assets/images/star.svg';
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
} from './MapStyle';
import { setCurrentDestination } from '../store/actions';
import logoAcciona from '../assets/logos/accionaLogo.png';
import logoAvant from '../assets/logos/avantLogo.png';
import logoCityscoot from '../assets/logos/cityscootLogo.png';
import logoEcooltra from '../assets/logos/ecooltraLogo.png';
import logoGecco from '../assets/logos/geccoLogo.png';
import logoIberscot from '../assets/logos/iberscotLogo.png';
import logoSeat from '../assets/logos/seatLogo.png';
import logoTucycle from '../assets/logos/tucycleLogo.png';
import logoOIZ from '../assets/logos/oizLogo.png';
import logoYego from '../assets/logos/yegoLogo.png';
import incommingMoto from '../assets/images/incommingMoto.png';
import motoRecommended from '../assets/images/motoRecommended.svg';
import motoAcciona from '../assets/images/motoAcciona.svg';
import motoAvant from '../assets/images/motoAvant.svg';
import motoCityscoot from '../assets/images/motoCityscoot.svg';
import motoEcooltra from '../assets/images/motoEcooltra.svg';
import motoGecco from '../assets/images/motoGecco.svg';
import motoIberscot from '../assets/images/motoIberscot.svg';
import motoSeat from '../assets/images/motoSeat.svg';
import motoTucycle from '../assets/images/motoTucycle.svg';
import motoOIZ from '../assets/images/motoOIZ.svg';
import motoYego from '../assets/images/motoYego.svg';
import HamburgerMenu from './HamburgerMenu';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;
const MAPBOX_STYLE = process.env.REACT_APP_MAPBOX_STYLE;
interface IMapProps {}

interface ProviderStoreI {
  [key: string]: ProviderI;
}
interface ProviderI {
  color: string;
  logo: string;
  price: number;
  moto: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const providerStore: ProviderStoreI = {
  Acciona: {
    color: '#FF0100',
    logo: logoAcciona,
    price: 0.26,
    moto: motoAcciona,
  },
  Avant: { color: '#1974BB', logo: logoAvant, price: 0.14, moto: motoAvant },
  Cityscoot: {
    color: '#0054BB',
    logo: logoCityscoot,
    price: 0.26,
    moto: motoCityscoot,
  },
  Ecooltra: {
    color: '#73C1A1',
    logo: logoEcooltra,
    price: 0.26,
    moto: motoEcooltra,
  },
  Gecco: { color: '#000', logo: logoGecco, price: 0.28, moto: motoGecco },
  Iberscot: {
    color: '#BF1E2E',
    logo: logoIberscot,
    price: 0.25,
    moto: motoIberscot,
  },
  'SEAT MÓtosharing': {
    color: '#33302E',
    logo: logoSeat,
    price: 0.26,
    moto: motoSeat,
  },
  TuCycleBarcelona: {
    color: '#661812',
    logo: logoTucycle,
    price: 0.23,
    moto: motoTucycle,
  },
  OIZ: { color: '#00AEEF', logo: logoOIZ, price: 0.24, moto: motoOIZ },
  Yego: { color: '#28323C', logo: logoYego, price: 0.25, moto: motoYego },
};

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
  const motoStoreCopy: any = [...motoStore];
  const [viewport, setViewport] = useState({
    width: 414,
    height: 736,
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleClickedMoto(moto: Moto, i: number, motoProviderInfo: any) {
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
                      src={motoRecommended}
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
                      src={incommingMoto}
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
                      src={incommingMoto}
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
            <>
              {motoIndex === 0 ? (
                <>
                  <img
                    src={starSVG}
                    alt="star"
                    style={{
                      height: '65px',
                      marginLeft: 20,
                      position: 'absolute',
                      zIndex: 20,
                      marginTop: '65vh',
                    }}
                  />
                </>
              ) : null}

              <MotoContainerDiv>
                <MotoInfo
                  moto={motoInfo}
                  motoIndex={motoIndex}
                  motoProvider={motoProvider}
                />
              </MotoContainerDiv>
            </>
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
