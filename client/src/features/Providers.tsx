/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, TextField } from '@material-ui/core';
import * as React from 'react';
import {
  ChangeEvent,
  MouseEventHandler,
  SetStateAction,
  useState,
} from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Switch from '@material-ui/core/Switch';
import { RootState } from '../store';
import { updateFavouriteDestination } from '../store/actions';
import { AppState, FavouriteDestination } from '../store/types';
import { Div } from './FavouritesStyle';

interface IProvidersProps {}

export const Providers: React.FC<IProvidersProps> = () => {
  const history = useHistory();
  const switchProviders: any = [
    {
      name: 'Acciona',
      isFiltered: true,
    },
    {
      name: 'Avant',
      isFiltered: false,
    },
    {
      name: 'Cityscoot',
      isFiltered: false,
    },
    {
      name: 'Ecooltra',
      isFiltered: false,
    },
    {
      name: 'Gecco',
      isFiltered: false,
    },
    {
      name: 'Iberscot',
      isFiltered: false,
    },
    {
      name: 'OIZ',
      isFiltered: false,
    },
    {
      name: 'SEAT MÓtosharing',
      isFiltered: false,
    },
    {
      name: 'TuCycleBarcelona',
      isFiltered: false,
    },
    {
      name: 'Yego',
      isFiltered: false,
    },
  ];
  const [switchState, setSwitchState] = useState(switchProviders);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log('🍌 -> handleChange -> event.target.name', event.target.name);
    console.log(
      '🍌 -> handleChange -> switchState[event.target.name]',
      switchState[event.target.name]
    );
    // setSwitchState(
    //   ...switchState,
    //   (switchState[event.target.name].isFiltered = event.target.checked)
    // );
  };
  const providers = useSelector((state: RootState) => state.user.providers);

  return (
    <>
      {providers.map((provider, i) => (
        <>
          <div key={provider.name}>{provider.name}</div>
          <Switch
            checked={switchState[i].isFiltered}
            onChange={handleChange}
            color="primary"
            name={`${i}`}
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        </>
      ))}
      <Button
        variant="contained"
        type="button"
        color="primary"
        onClick={() => history.push('/map')}
      >
        SAVE
      </Button>
    </>
  );
};

const mapStateToProps = (state: AppState) => ({});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Providers);
