import * as React from 'react';
import { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import ReactMapGL, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import { getAllMotos } from '../store/actions';
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

interface IMapProps {}
const currentCoordinates = {
  latitude: 41.388322990209986,
  longitude: 2.1674086563622703,
};

export const Map: React.FC<IMapProps> = (props) => {
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
  const [viewport, setViewport] = useState({
    width: 414,
    height: 736,
    latitude: 41.388322990209986,
    longitude: 2.1674086563622703,
    zoom: 16,
  });

  useEffect(() => {
    setIsLoading(false);
    dispatch(getAllMotos());
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
          mapboxApiAccessToken="pk.eyJ1IjoiY2FybG9zZHN2IiwiYSI6ImNraTBndG9sYTFjeXkycW1wa2Rtbjd3bHcifQ.k9Spta0MBUHxwMJcOdoGwA"
          mapStyle="mapbox://styles/carlosdsv/cki9d9jnu3v3h19o1d7f88oew"
        >
          <Marker
            latitude={currentCoordinates.latitude}
            longitude={currentCoordinates.longitude}
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
  getAllMotos: () => dispatch(getAllMotos()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);
