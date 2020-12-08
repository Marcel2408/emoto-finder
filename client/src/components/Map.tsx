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
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import RoomIcon from '@material-ui/icons/Room';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PinDropIcon from '@material-ui/icons/PinDrop';
import { AppState, Moto } from '../store/types';
import starSVG from '../assets/images/star.svg';
import { RootState } from '../store';
import MotoInfo from './MotoInfo';
import {
  ContainerDiv,
  HeaderDiv,
  MapDiv,
  MotoContainerDiv,
  ChangeDestinationDiv,
  SelectedMotoDiv,
  NormalMotoDiv,
} from './MapStyle';
import HamburgerMenu from './HamburgerMenu';
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

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;
const MAPBOX_STYLE = process.env.REACT_APP_MAPBOX_STYLE;
interface IMapProps {}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const providerStore: any = {
  Acciona: { color: '#FF0100', logo: logoAcciona, price: 0.26 },
  Avant: { color: '#1974BB', logo: logoAvant },
  price: 0.14,
  Cityscoot: { color: '#0054BB', logo: logoCityscoot, price: 0.26 },
  Ecooltra: { color: '#73C1A1', logo: logoEcooltra, price: 0.26 },
  Gecco: { color: '#000', logo: logoGecco, price: 0.28 },
  Iberscot: { color: '#BF1E2E', logo: logoIberscot, price: 0.25 },
  'SEAT MÓtosharing': { color: '#33302E', logo: logoSeat, price: 0.26 },
  TuCycleBarcelona: { color: '#661812', logo: logoTucycle, price: 0.23 },
  OIZ: { color: '#00AEEF', logo: logoOIZ, price: 0.24 },
  Yego: { color: '#28323C', logo: logoYego, price: 0.25 },
};

export const Map: React.FC<IMapProps> = () => {
  const history = useHistory();
  const disptach = useDispatch();
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
    }, 1000);
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
    disptach(setCurrentDestination({ destination: '', label: '' }));
    history.push('/destination');
  };

  if (isLoading) {
    return <div>LOADING...</div>;
  }

  return (
    <ContainerDiv>
      <HeaderDiv>
        <div>
          <HamburgerMenu />
        </div>
        <ChangeDestinationDiv>
          <Button
            variant="contained"
            color="primary"
            type="button"
            onClick={handleChangeDestination}
          >
            Change Destination
          </Button>
        </ChangeDestinationDiv>
      </HeaderDiv>
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
            {viewport.zoom > 18 ? <p>{destinationStore.destination}</p> : null}
            <PinDropIcon style={{ width: '30px', height: '30px' }} />
          </Marker>
          <Marker latitude={userStore.latitude} longitude={userStore.longitude}>
            {viewport.zoom > 18 ? <p>{userStore.username}</p> : null}
            <AccountCircleIcon style={{ width: '30px', height: '30px' }} />
          </Marker>
          {motosFilteredByProviders?.map((moto: Moto, i: number) => {
            const { provider } = moto;
            return (
              <Marker
                key={moto.id}
                latitude={moto.latitude}
                longitude={moto.longitude}
              >
                {i === 0 ? (
                  <SelectedMotoDiv>
                    {viewport.zoom > 18 ? (
                      <img
                        src={providerStore[provider.name].logo}
                        alt="provider logo"
                        style={{ height: '20px' }}
                      />
                    ) : null}

                    <RoomIcon
                      onClickCapture={
                        () =>
                          handleClickedMoto(
                            moto,
                            i,
                            providerStore[provider.name]
                          )
                        // eslint-disable-next-line react/jsx-curly-newline
                      }
                      style={{
                        color: '#FFA40B',
                        width: 35,
                        height: 35,
                      }}
                    />
                  </SelectedMotoDiv>
                ) : (
                  <NormalMotoDiv>
                    {viewport.zoom > 18 ? (
                      <img
                        src={providerStore[provider.name].logo}
                        alt="provider logo"
                        style={{ height: '20px' }}
                      />
                    ) : null}
                    <RoomIcon
                      onClickCapture={
                        () =>
                          handleClickedMoto(
                            moto,
                            i,
                            providerStore[provider.name]
                          )
                        // eslint-disable-next-line react/jsx-curly-newline
                      }
                      style={{
                        color: `${providerStore[provider.name].color}`,
                        width: 25,
                        height: 25,
                      }}
                    />
                  </NormalMotoDiv>
                )}
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
