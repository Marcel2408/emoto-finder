import * as React from 'react';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import BatteryCharging60Icon from '@material-ui/icons/BatteryCharging60';
import AspectRatioIcon from '@material-ui/icons/AspectRatio';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';

import { Moto } from '../store/types';
import {
  MotoInfoButton,
  MotoInfoContainer,
  MotoInfoDetails,
  MotoInfoLeft,
  MotoInfoRight,
  MotoInfoRightInfo,
  MotoInfoRightLogo,
} from './MotoInfoStyle';

interface IMotoInfoProps {
  moto: Moto;
  motoIndex: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  motoProvider: any;
}

const MotoInfo: React.FC<IMotoInfoProps> = ({
  moto,
  motoIndex,
  motoProvider,
}) => {
  return (
    <MotoInfoContainer>
      <MotoInfoDetails>
        <MotoInfoLeft>
          <h2>{moto.provider.name}</h2>
          <Divider variant="middle" />
        </MotoInfoLeft>
        <MotoInfoRight>
          <MotoInfoRightLogo>
            <img src={motoProvider.logo} alt="provider logo" />
          </MotoInfoRightLogo>
          <MotoInfoRightInfo>
            <div>
              <BatteryCharging60Icon style={{ height: '20px' }} />
              <p>{moto.battery} %</p>
            </div>
            <div>
              <AspectRatioIcon style={{ height: '20px' }} />
              <p>{moto.publicId}</p>
            </div>
            <div>
              <DirectionsWalkIcon style={{ height: '20px' }} />
              <p>{Math.round(moto.walkTime / 60)} min</p>
            </div>
          </MotoInfoRightInfo>
        </MotoInfoRight>
      </MotoInfoDetails>
      <MotoInfoButton>
        <Button
          variant="contained"
          type="button"
          color="primary"
          onClick={() => alert('Have a nice trip!')}
        >
          Book Moto
        </Button>
      </MotoInfoButton>
    </MotoInfoContainer>
  );
};

export default MotoInfo;
