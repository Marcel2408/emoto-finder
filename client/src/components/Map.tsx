import * as React from 'react';
import { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import ReactMapGL, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import { AppState, Moto } from '../store/types';
import scotterSVG from '../images/scooter.svg';
import { RootState } from '../store';
import MotoInfo from './MotoInfo';
import {
  ContainerDiv,
  HeaderDiv,
  MapDiv,
  MotoContainerDiv,
  SelectedMotoDiv,
  ChangeDestinationDiv,
} from './MapStyle';
import HamburgerMenu from './HamburgerMenu';
import { setCurrentDestination } from '../store/actions';

interface IMapProps {}

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;
const MAPBOX_STYLE = process.env.REACT_APP_MAPBOX_STYLE;

export const Map: React.FC<IMapProps> = (props) => {
  const history = useHistory();
  const disptach= useDispatch();
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
          <Marker
            latitude={userStore.latitude}
            longitude={userStore.longitude}
          >
            <PersonPinIcon />
          </Marker>
          {motoStore?.map((moto, i) => (
            <Marker
              key={moto.id}
              latitude={moto.latitude}
              longitude={moto.longitude}
            >
              {i === 1 ? (
                <SelectedMotoDiv>
                  <img
                    onClickCapture={() => handleClickedMoto(moto, i)}
                    src={scotterSVG}
                    alt=""
                    style={{ width: '20px', height: '20px' }}
                  />
                </SelectedMotoDiv>
              ) : (
                <img
                  onClickCapture={() => handleClickedMoto(moto, i)}
                  src={scotterSVG}
                  alt=""
                  style={{ width: '20px', height: '20px' }}
                />
              )}
            </Marker>
          ))}
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
