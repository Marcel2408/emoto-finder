import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import BatteryCharging60Icon from '@material-ui/icons/BatteryCharging60';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import EuroIcon from '@material-ui/icons/Euro';
import MotorcycleIcon from '@material-ui/icons/Motorcycle';
import BrandingWatermarkIcon from '@material-ui/icons/BrandingWatermark';
import DrivingPlateIcon from '../assets/images/licence-plate.png';

import { Moto } from '../store/types';
import {
  MotoInfoContainer,
  MotoInfoWrapper,
  FlexColumn,
  MotoInfoDetails,
  MotoInfoProviderLogo,
  BookMoto
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
    if (window.navigator.platform.indexOf('Win') !== -1) OSName = 'Windows';
    if (window.navigator.platform.indexOf('Mac') !== -1) OSName = 'Mac';
    if (window.navigator.platform.indexOf('X11') !== -1) OSName = 'UNIX';
    if (window.navigator.platform.indexOf('Linux') !== -1) OSName = 'Linux';
    if (window.navigator.platform.indexOf('iPhone') !== -1) OSName = 'iOS';
    if (window.navigator.platform.indexOf('Android') !== -1) OSName = 'Android';

    return OSName;
  };

  const dispatch = useDispatch();
  const destination = useSelector((state: RootState) => state.destination);

  function handletTakeMeThereClick() {
    dispatch(bookMoto(destination.destination, moto));
    const userOS = detectOS();
    if (userOS === ('Windows' || 'UNIX' || 'Linux' || 'Android'))
      window.location.replace(moto.provider.app.android);
    if (userOS === ('Mac' || 'iOS'))
      window.location.replace(moto.provider.app.ios);
  }

  return (
    <MotoInfoContainer>
      <MotoInfoProviderLogo>
        <img src={motoProvider.logo} alt="provider logo" />
      </MotoInfoProviderLogo>
      <MotoInfoWrapper>
        <FlexColumn>
          <MotoInfoDetails>
            <EuroIcon style={{ height: '1em', width: '1em', borderRadius: '4px', backgroundColor: '#303f9f', padding: '.15em', color: 'white', marginRight: '.35em' }} />
            {parseFloat(
              ` ${(moto.driveTime / 60) * motoProvider.price}`
            ).toFixed(2)}
          </MotoInfoDetails>
          <MotoInfoDetails>
            <DirectionsWalkIcon style={{ height: '1em', width: '1em', borderRadius: '4px', backgroundColor: '#303f9f', padding: '.15em', color: 'white', marginRight: '.35em' }} />
            <p>{Math.round(moto.walkTime / 60)} min</p>
          </MotoInfoDetails>
          <MotoInfoDetails>
            <MotorcycleIcon style={{ height: '1em', width: '1em', borderRadius: '4px', backgroundColor: '#303f9f', padding: '.15em', color: 'white', marginRight: '.35em' }} />
            <p>{Math.round(moto.driveTime / 60)} min</p>
          </MotoInfoDetails>
        </FlexColumn>
        <FlexColumn>
          <MotoInfoDetails>
            <BatteryCharging60Icon style={{ height: '1em', width: '1em', borderRadius: '4px', backgroundColor: '#303f9f', padding: '.15em', color: 'white', marginRight: '.35em' }} />
            <p>{moto.battery} %</p>
          </MotoInfoDetails>
          <MotoInfoDetails>
            <BrandingWatermarkIcon style={{ height: '1em', width: '1em', borderRadius: '4px', backgroundColor: '#303f9f', padding: '.15em', color: 'white', marginRight: '.35em' }} />
            <p>{moto.publicId && moto.publicId}</p>
          </MotoInfoDetails>
        </FlexColumn>
      </MotoInfoWrapper>
      <BookMoto
        onClick={handletTakeMeThereClick}
      >
        BOOK MOTO
      </BookMoto>
    </MotoInfoContainer>
  );
};

export default MotoInfo;
