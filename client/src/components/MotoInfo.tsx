import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
import { RootState } from '../store';
import { bookMoto } from '../store/actions';

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

  const detectOS = (): string => {
    let OSName = 'Unknown';
    if (window.navigator.platform.indexOf('Win') !== -1) OSName='Windows';
    if (window.navigator.platform.indexOf('Mac') !== -1) OSName='Mac';
    if (window.navigator.platform.indexOf('X11') !== -1) OSName='UNIX';
    if (window.navigator.platform.indexOf('Linux') !== -1) OSName='Linux';
    if (window.navigator.platform.indexOf('iPhone') !== -1) OSName='iOS';
    if (window.navigator.platform.indexOf('Android') !== -1) OSName='Android';

    return OSName;
  };

  const dispatch = useDispatch();
  const destination = useSelector((state: RootState) => state.destination);

  function handletTakeMeThereClick() {
    dispatch(bookMoto(destination.destination, moto));
    const userOS = detectOS();
    if (userOS === ('Windows' || 'UNIX' || 'Linux' || 'Android')) window.location.replace(moto.provider.app.android);
    if (userOS === ('Mac' || 'iOS')) window.location.replace(moto.provider.app.ios);
  }

  return (
    <MotoInfoContainer>
      <MotoInfoDetails>
        <MotoInfoLeft>
          <h2>{moto.provider.name}</h2>
          <Divider variant='middle' />
        </MotoInfoLeft>
        <MotoInfoRight>
          <MotoInfoRightLogo>
            <img src={motoProvider.logo} alt='provider logo' />
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
          variant='contained'
          type='button'
          color='primary'
          onClick={handletTakeMeThereClick}
        >
          Book Moto
        </Button>
      </MotoInfoButton>
    </MotoInfoContainer>
  );
};

export default MotoInfo;
