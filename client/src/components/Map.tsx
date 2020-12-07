/* eslint-disable no-nested-ternary */
import * as React from 'react';
import { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import ReactMapGL, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import RoomIcon from '@material-ui/icons/Room';
import { AppState, Moto } from '../store/types';
import userSVG from '../assets/images/user.svg';
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
  Acciona: { color: '#FF0100', logo: logoAcciona },
  Avant: { color: '#1974BB', logo: logoAvant },
  Cityscoot: { color: '#0054BB', logo: logoCityscoot },
  Ecooltra: { color: '#73C1A1', logo: logoEcooltra },
  Gecco: { color: '#000', logo: logoGecco },
  Iberscot: { color: '#BF1E2E', logo: logoIberscot },
  'SEAT MÓtosharing': { color: '#33302E', logo: logoSeat },
  TuCycleBarcelona: { color: '#661812', logo: logoTucycle },
  OIZ: { color: '#00AEEF', logo: logoOIZ },
  Yego: { color: '#28323C', logo: logoYego },
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
  const userStore = useSelector((state: RootState) => state.user);

  const [motoIndex, setMotoIndex] = useState(0);
  const [viewport, setViewport] = useState({
    width: 414,
    height: 736,
    latitude: userStore.latitude,
    longitude: userStore.longitude,
    zoom: 16,
  });

  useEffect(() => {
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleClickedMoto(moto: Moto, i: number) {
    setIsMotoInfoClicked(true);
    setMotoInfo(moto);
    setMotoIndex(i);
  }

  function handleClickedScreen() {
    setIsMotoInfoClicked(false);
  }
  const handleChangeDestination = () => {
    disptach(setCurrentDestination({ destination: '', label: '' }));
    history.push('/destination');
  };

  const motoStore = useSelector((state: RootState) => state.motos);

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
          <Marker latitude={userStore.latitude} longitude={userStore.longitude}>
            {viewport.zoom > 18 ? <p>{userStore.username}</p> : null}
            <img
              src={userSVG}
              alt="user marker"
              style={{ width: '35px', height: '35px' }}
            />
          </Marker>
          {motoStore?.map((moto, i) => {
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
                      onClickCapture={() => handleClickedMoto(moto, i)}
                      style={{
                        color: '#DAA520',
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
                      onClickCapture={() => handleClickedMoto(moto, i)}
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
            <MotoContainerDiv>
              <MotoInfo moto={motoInfo} motoIndex={motoIndex} />
            </MotoContainerDiv>
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
