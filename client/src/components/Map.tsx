import * as React from 'react';
import { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { getAllMotos } from '../store/actions';
import { AppState } from '../store/types';

interface IMapProps {}

export const Map: React.FC<IMapProps> = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    dispatch(getAllMotos());

    // eslint-disable-next-line no-console
    console.log();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isLoading) {
    return <div>LOADING...</div>;
  }
  return <div>Map</div>;
};

const mapStateToProps = (state: AppState) => ({
  motos: state.avbMotos,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapDispatchToProps = (dispatch: any) => ({
  getAllMotos: () => dispatch(getAllMotos()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);
