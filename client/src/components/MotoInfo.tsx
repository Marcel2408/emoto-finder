import * as React from 'react';
import Button from '@material-ui/core/Button';
import { Moto } from '../store/types';
import {
  MotoInfoButtonDiv,
  MotoInfoContainerDiv,
  MotoInfoTextDiv,
} from './MapInfoStyle';

interface IMotoInfoProps {
  moto: Moto;
  motoIndex: number;
}

const MotoInfo: React.FC<IMotoInfoProps> = ({ moto, motoIndex }) => {
  return (
    <MotoInfoContainerDiv>
      <MotoInfoTextDiv>
        <h2>{moto.provider.name}</h2>
        <p>battery: {moto.battery} %</p>
        <p>plate: {moto.publicId}</p>
        <p>i: {motoIndex}</p>
      </MotoInfoTextDiv>
      <MotoInfoButtonDiv>
        <Button
          variant="contained"
          type="button"
          color="primary"
          onClick={() => alert('Have a nice trip!')}
        >
          Book Moto
        </Button>
      </MotoInfoButtonDiv>
    </MotoInfoContainerDiv>
  );
};

export default MotoInfo;
