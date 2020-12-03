import * as React from 'react';
import { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import ReactMapGL, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { getAllMotos } from '../store/actions';
import { AppState } from '../store/types';
import scotterSVG from '../images/scooter.svg';
import { RootState } from '../store';

interface IMapProps {}
const currentCoordinates = {
  latitude: 41.395120834,
  longitude: 2.197954527,
};

export const Map: React.FC<IMapProps> = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [viewport, setViewport] = useState({
    width: 1000,
    height: 1000,
    latitude: 41.395120834,
    longitude: 2.197954527,
    zoom: 12,
  });

  const dispatch = useDispatch();
  // const onViewportChange = (viewport: InteractiveMapProps) => {
  //   setViewPort(viewport)
  // }

  useEffect(() => {
    setIsLoading(false);
    dispatch(getAllMotos());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const motoStore = useSelector((state: RootState) => state);
  console.log('PROPS>>> ', motoStore);

  if (isLoading) {
    return <div>LOADING...</div>;
  }
  return (
    <ReactMapGL
      {...viewport}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
      mapboxApiAccessToken="pk.eyJ1IjoiY2FybG9zZHN2IiwiYSI6ImNraTBndG9sYTFjeXkycW1wa2Rtbjd3bHcifQ.k9Spta0MBUHxwMJcOdoGwA"
    >
      <Marker
        latitude={currentCoordinates.latitude}
        longitude={currentCoordinates.longitude}
      >
        <img
          src={scotterSVG}
          alt=""
          style={{ width: '20px', height: '20px' }}
        />
      </Marker>
    </ReactMapGL>
  );
};
// {motoStore.avbMotos?.map((moto) => (
//   <Marker key={moto.id} latitude={moto.lat} longitude={moto.lng}>
//     <img
//       src={scotterSVG}
//       alt=""
//       style={{ width: '20px', height: '20px' }}
//     />
//   </Marker>
// ))}

const mapStateToProps = (state: AppState) => ({
  avbMotos: state.avbMotos,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapDispatchToProps = (dispatch: any) => ({
  getAllMotos: () => dispatch(getAllMotos()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);
