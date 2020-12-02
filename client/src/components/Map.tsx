import * as React from 'react';
import { useEffect } from 'react';
import { getAllMotos } from '../store/actions';

interface IMapProps {}

const Map: React.FC<IMapProps> = () => {
  useEffect(() => {
    getAllMotos();
  }, []);
  return <div>Map</div>;
};

export default Map;
