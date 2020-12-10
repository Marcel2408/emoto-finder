/* eslint-disable react/jsx-curly-newline */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable no-nested-ternary */
import * as React from 'react';
import { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import ReactMapGL, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useHistory } from 'react-router-dom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PinDropIcon from '@material-ui/icons/PinDrop';
import { PulseLoader } from 'react-spinners';
import DirectionsIcon from '@material-ui/icons/Directions';
import FilterListIcon from '@material-ui/icons/FilterList';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { common } from '@material-ui/core/colors';
import {
  GET_DESTINATION_COORDINATES_AND_MOTOS,
  AppState, Moto } from '../store/types';
import starSVG from '../assets/images/star.svg';

import lightening from '../assets/images/lightning.svg';
import { RootState } from '../store';
import MotoInfo from './MotoInfo';
import {
  ContainerDiv,
  HeaderDiv,
  MapDiv,
  MotoContainerDiv,
  SelectedMotoDiv,
  NormalMotoDiv,
  CircleIcon,
  HeaderRight,
  Pin,
  LoaderMap,
  BestMotoImage,
} from './MapStyle';

import { MotoContainerWrapper } from './MotoInfoStyle';
import HamburgerMenu from './HamburgerMenu';
import { setCurrentDestination } from '../store/actions';
import logoAcciona from '../assets/logos/accionaLogo.png';
import logoAvant from '../assets/logos/avantLogo.png';
import logoCityscoot from '../assets/logos/cityscootLogo.png';
import logoEcooltra from '../assets/logos/ecooltraLogo.png';
import logoGecco from '../assets/logos/geccoLogo.png';
import logoIberscot from '../assets/logos/iberscotLogo.png';
import logoSeat from '../assets/logos/seatLogo.png';
import logoTucycle from '../assets/logos/tucycleLogo.png';
import logoOIZ from '../assets/logos/oizLogo.png';
import logoYego from '../assets/logos/yegoLogo.png';
import incommingMoto from '../assets/images/incommingMoto.png';
import motoRecommended from '../assets/images/motoRecommended.svg';
import motoAcciona from '../assets/images/motoAcciona.svg';
import motoAvant from '../assets/images/motoAvant.svg';
import motoCityscoot from '../assets/images/motoCityscoot.svg';
import motoEcooltra from '../assets/images/motoEcooltra.svg';
import motoGecco from '../assets/images/motoGecco.svg';
import motoIberscot from '../assets/images/motoIberscot.svg';
import motoSeat from '../assets/images/motoSeat.svg';
import motoTucycle from '../assets/images/motoTucycle.svg';
import motoOIZ from '../assets/images/motoOIZ.svg';
import motoYego from '../assets/images/motoYego.svg';


const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;
const MAPBOX_STYLE = process.env.REACT_APP_MAPBOX_STYLE;
interface IMapProps {}

interface ProviderStoreI {
  [key: string]: ProviderI;
}
interface ProviderI {
  color: string;
  logo: string;
  price: number;
  moto: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const providerStore: ProviderStoreI = {
  Acciona: {
    color: '#FF0100',
    logo: logoAcciona,
    price: 0.26,
    moto: motoAcciona,
  },
  Avant: { color: '#1974BB', logo: logoAvant, price: 0.14, moto: motoAvant },
  Cityscoot: {
    color: '#0054BB',
    logo: logoCityscoot,
    price: 0.26,
    moto: motoCityscoot,
  },
  Ecooltra: {
    color: '#73C1A1',
    logo: logoEcooltra,
    price: 0.26,
    moto: motoEcooltra,
  },
  Gecco: { color: '#000', logo: logoGecco, price: 0.28, moto: motoGecco },
  Iberscot: {
    color: '#BF1E2E',
    logo: logoIberscot,
    price: 0.25,
    moto: motoIberscot,
  },
  'SEAT MÓtosharing': {
    color: '#33302E',
    logo: logoSeat,
    price: 0.26,
    moto: motoSeat,
  },
  TuCycleBarcelona: {
    color: '#661812',
    logo: logoTucycle,
    price: 0.23,
    moto: motoTucycle,
  },
  OIZ: { color: '#00AEEF', logo: logoOIZ, price: 0.24, moto: motoOIZ },
  Yego: { color: '#28323C', logo: logoYego, price: 0.25, moto: motoYego },
};

const theme = createMuiTheme({
  palette: {
    primary: { main: common.white },
  },
});

export const Map: React.FC<IMapProps> = () => {
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
  const [motoProvider, setMotoProvider] = useState({});
  const userStore = useSelector((state: RootState) => state.user);
  const motoStore = useSelector((state: RootState) => state.motos);
  const destinationStore = useSelector((state: RootState) => state.destination);
  const [motosFilteredByProviders, setMotosFilteredByProviders] = useState([]);
  const motoStoreCopy: any = [
    {
      'id': 'aWJlcnNjb3Q6TU9UT1JTQ09PVEVSOnZfM3F2ZWE4MWhhZnVwMWUyNjF2M2g=',
      'publicId': 'XXX785',
      'type': 'MOTORSCOOTER',
      'latitude': 41.39208,
      'longitude': 2.17877,
      'provider': {
        'name': 'Iberscot',
        'app': {
          'android': 'https://play.google.com/store/apps/details?id=net.iberscot.app',
          'ios': 'https://itunes.apple.com/app/id1513924750'
        }
      },
      'battery': 76,
      'walkTime': 75.3,
      'driveTime': 561.1,
      'totalTravelTime': 636.4
    },
    {
      'id': 'b2l6Ok1PVE9SU0NPT1RFUjp2XzNxdmU5bTRqNmFqdW5ycmM4MTNo',
      'publicId': 'BMF088',
      'type': 'MOTORSCOOTER',
      'latitude': 41.394017977120974,
      'longitude': 2.1813421340462145,
      'provider': {
        'name': 'Ecooltra',
        'app': {
          'android': 'https://play.google.com/store/apps/details?id=com.mobime.ecooltra',
          'ios': 'https://itunes.apple.com/app/id1083424977?'
        }
      },
      'battery': 91,
      'walkTime': 80.1,
      'driveTime': 562.1,
      'totalTravelTime': 642.2
    },
    {
      'id': 'eWVnbzpNT1RPUlNDT09URVI6MTQ2Nw==',
      'publicId': null,
      'type': 'MOTORSCOOTER',
      'latitude': 41.392237,
      'longitude': 2.179,
      'provider': {
        'name': 'Yego',
        'app': {
          'android': 'https://play.google.com/store/apps/details?id=com.getyugo.app',
          'ios': 'https://itunes.apple.com/appid1181020675?mt=8'
        }
      },
      'battery': 40,
      'walkTime': 61,
      'driveTime': 601.8,
      'totalTravelTime': 662.8
    },
    {
      'id': 'ZWNvb2x0cmE6TU9UT1JTQ09PVEVSOkVTLUItQTAwNjc2',
      'publicId': 'C6221BWF',
      'type': 'MOTORSCOOTER',
      'latitude': 41.392231,
      'longitude': 2.178947,
      'provider': {
        'name': 'Ecooltra',
        'app': {
          'android': 'https://play.google.com/store/apps/details?id=com.mobime.ecooltra',
          'ios': 'https://itunes.apple.com/app/id1083424977?'
        }
      },
      'battery': 100,
      'walkTime': 62.9,
      'driveTime': 601.4,
      'totalTravelTime': 664.3
    },
    {
      'id': 'Y2l0eXNjb290Ok1PVE9SU0NPT1RFUjpDNzQwNUJXSw==',
      'publicId': 'C7405BWK',
      'type': 'MOTORSCOOTER',
      'latitude': 41.39147833333333,
      'longitude': 2.1795416666666663,
      'provider': {
        'name': 'Cityscoot',
        'app': {
          'android': 'https://play.google.com/store/apps/details?id=com.livebanner.cityscoot',
          'ios': 'https://itunes.apple.com/app/id1011202160'
        }
      },
      'battery': 91,
      'walkTime': 138.5,
      'driveTime': 527.2,
      'totalTravelTime': 665.7
    },
    {
      'id': 'Y2l0eXNjb290Ok1PVE9SU0NPT1RFUjpDNzY5M0JXSw==',
      'publicId': 'C7693BWK',
      'type': 'MOTORSCOOTER',
      'latitude': 41.39171999999999,
      'longitude': 2.178328333333333,
      'provider': {
        'name': 'Cityscoot',
        'app': {
          'android': 'https://play.google.com/store/apps/details?id=com.livebanner.cityscoot',
          'ios': 'https://itunes.apple.com/app/id1011202160'
        }
      },
      'battery': 89,
      'walkTime': 114.5,
      'driveTime': 569.6,
      'totalTravelTime': 684.1
    },
    {
      'id': 'YXZhbnQ6TU9UT1JTQ09PVEVSOnZfM3F2ZTl4NjF1eDFhbjljOWVzcmg=',
      'publicId': 'XXX072',
      'type': 'MOTORSCOOTER',
      'latitude': 41.39118,
      'longitude': 2.17982,
      'provider': {
        'name': 'Avant',
        'app': {
          'android': 'https://play.google.com/store/apps/details?id=fun.avant.app',
          'ios': 'https://itunes.apple.com/app/id1515087569'
        }
      },
      'battery': 49,
      'walkTime': 165.6,
      'driveTime': 531.3,
      'totalTravelTime': 696.9
    },
    {
      'id': 'b2l6Ok1PVE9SU0NPT1RFUjp2XzNxdmVhNmUyYWhiNGVseGJidmUx',
      'publicId': 'XXX271',
      'type': 'MOTORSCOOTER',
      'latitude': 41.39268,
      'longitude': 2.1821699999999997,
      'provider': {
        'name': 'OIZ',
        'app': {
          'android': 'https://play.google.com/store/apps/details?id=com.oizbike.app',
          'ios': 'https://itunes.apple.com/app/id1525687104'
        }
      },
      'battery': 87,
      'walkTime': 202.9,
      'driveTime': 498,
      'totalTravelTime': 700.9
    },
    {
      'id': 'Y2l0eXNjb290Ok1PVE9SU0NPT1RFUjpDMTczNkJXSg==',
      'publicId': 'C1736BWJ',
      'type': 'MOTORSCOOTER',
      'latitude': 41.39127666666667,
      'longitude': 2.178148333333333,
      'provider': {
        'name': 'Cityscoot',
        'app': {
          'android': 'https://play.google.com/store/apps/details?id=com.livebanner.cityscoot',
          'ios': 'https://itunes.apple.com/app/id1011202160'
        }
      },
      'battery': 89,
      'walkTime': 167,
      'driveTime': 592.4,
      'totalTravelTime': 759.4
    },
    {
      'id': 'Y2l0eXNjb290Ok1PVE9SU0NPT1RFUjpDMTgwNkJXSg==',
      'publicId': 'C1806BWJ',
      'type': 'MOTORSCOOTER',
      'latitude': 41.390901666666664,
      'longitude': 2.1772983333333333,
      'provider': {
        'name': 'Cityscoot',
        'app': {
          'android': 'https://play.google.com/store/apps/details?id=com.livebanner.cityscoot',
          'ios': 'https://itunes.apple.com/app/id1011202160'
        }
      },
      'battery': 93,
      'walkTime': 206.6,
      'driveTime': 596.3,
      'totalTravelTime': 802.9
    },
    {
      'id': 'aWJlcnNjb3Q6TU9UT1JTQ09PVEVSOnZfM3F2ZWE2N2o0em16Y2h1YmxnbGg=',
      'publicId': 'XXX089',
      'type': 'MOTORSCOOTER',
      'latitude': 41.393989999999995,
      'longitude': 2.1769499999999997,
      'provider': {
        'name': 'Iberscot',
        'app': {
          'android': 'https://play.google.com/store/apps/details?id=net.iberscot.app',
          'ios': 'https://itunes.apple.com/app/id1513924750'
        }
      },
      'battery': 74,
      'walkTime': 237.7,
      'driveTime': 600.9,
      'totalTravelTime': 838.5999999999999
    },
    {
      'id': 'aWJlcnNjb3Q6TU9UT1JTQ09PVEVSOnZfM3F2ZWE3OWtybnp1dWF0ZmUzcTE=',
      'publicId': 'XXX749',
      'type': 'MOTORSCOOTER',
      'latitude': 41.39017,
      'longitude': 2.1829,
      'provider': {
        'name': 'Iberscot',
        'app': {
          'android': 'https://play.google.com/store/apps/details?id=net.iberscot.app',
          'ios': 'https://itunes.apple.com/app/id1513924750'
        }
      },
      'battery': 59,
      'walkTime': 349,
      'driveTime': 531.5,
      'totalTravelTime': 880.5
    },
    {
      'id': 'Y2l0eXNjb290Ok1PVE9SU0NPT1RFUjpDNzYwMkJXSw==',
      'publicId': 'C7602BWK',
      'type': 'MOTORSCOOTER',
      'latitude': 41.39203333333333,
      'longitude': 2.1767533333333335,
      'provider': {
        'name': 'Cityscoot',
        'app': {
          'android': 'https://play.google.com/store/apps/details?id=com.livebanner.cityscoot',
          'ios': 'https://itunes.apple.com/app/id1011202160'
        }
      },
      'battery': 91,
      'walkTime': 269.2,
      'driveTime': 617,
      'totalTravelTime': 886.2
    },
    {
      'id': 'Z2VjY286TU9UT1JTQ09PVEVSOkVTLUItRzAwMzk5',
      'publicId': 'C5302BWH',
      'type': 'MOTORSCOOTER',
      'latitude': 41.395428,
      'longitude': 2.179285,
      'provider': {
        'name': 'Gecco',
        'app': {
          'android': 'https://play.google.com/store/apps/details?id=es.gecco',
          'ios': 'https://apps.apple.com/app/id1516642624'
        }
      },
      'battery': 69,
      'walkTime': 282.8,
      'driveTime': 623.7,
      'totalTravelTime': 906.5
    },
    {
      'id': 'Z2VjY286TU9UT1JTQ09PVEVSOkVTLUItRzAwMTAy',
      'publicId': 'C6062BWH',
      'type': 'MOTORSCOOTER',
      'latitude': 41.395489,
      'longitude': 2.17914,
      'provider': {
        'name': 'Gecco',
        'app': {
          'android': 'https://play.google.com/store/apps/details?id=es.gecco',
          'ios': 'https://apps.apple.com/app/id1516642624'
        }
      },
      'battery': 70,
      'walkTime': 292.4,
      'driveTime': 620.3,
      'totalTravelTime': 912.6999999999999
    },
    {
      'id': 'aWJlcnNjb3Q6TU9UT1JTQ09PVEVSOnZfM3F2ZTl6eXY2MmxybTVxOHFwcmg=',
      'publicId': 'XXX712',
      'type': 'MOTORSCOOTER',
      'latitude': 41.39544,
      'longitude': 2.17727,
      'provider': {
        'name': 'Iberscot',
        'app': {
          'android': 'https://play.google.com/store/apps/details?id=net.iberscot.app',
          'ios': 'https://itunes.apple.com/app/id1513924750'
        }
      },
      'battery': 83,
      'walkTime': 305.8,
      'driveTime': 610.7,
      'totalTravelTime': 916.5
    },
    {
      'id': 'Z2VjY286TU9UT1JTQ09PVEVSOkVTLUItRzAwMTcz',
      'publicId': 'C6469BWH',
      'type': 'MOTORSCOOTER',
      'latitude': 41.395611,
      'longitude': 2.17894,
      'provider': {
        'name': 'Gecco',
        'app': {
          'android': 'https://play.google.com/store/apps/details?id=es.gecco',
          'ios': 'https://apps.apple.com/app/id1516642624'
        }
      },
      'battery': 23,
      'walkTime': 309.1,
      'driveTime': 612.8,
      'totalTravelTime': 921.9
    },
    {
      'id': 'Z2VjY286TU9UT1JTQ09PVEVSOkVTLUItRzAwMzEz',
      'publicId': 'C7817BWH',
      'type': 'MOTORSCOOTER',
      'latitude': 41.39542,
      'longitude': 2.178958,
      'provider': {
        'name': 'Gecco',
        'app': {
          'android': 'https://play.google.com/store/apps/details?id=es.gecco',
          'ios': 'https://apps.apple.com/app/id1516642624'
        }
      },
      'battery': 31,
      'walkTime': 323.6,
      'driveTime': 609.8,
      'totalTravelTime': 933.4
    },
    {
      'id': 'ZWNvb2x0cmE6TU9UT1JTQ09PVEVSOkVTLUItQTAwNzE4',
      'publicId': 'C6340BWF',
      'type': 'MOTORSCOOTER',
      'latitude': 41.391602,
      'longitude': 2.17604,
      'provider': {
        'name': 'Ecooltra',
        'app': {
          'android': 'https://play.google.com/store/apps/details?id=com.mobime.ecooltra',
          'ios': 'https://itunes.apple.com/app/id1083424977?'
        }
      },
      'battery': 55,
      'walkTime': 313.1,
      'driveTime': 635.2,
      'totalTravelTime': 948.3000000000001
    },
    {
      'id': 'Z2VjY286TU9UT1JTQ09PVEVSOkVTLUItRzAwMTMz',
      'publicId': 'C6163BWH',
      'type': 'MOTORSCOOTER',
      'latitude': 41.395805,
      'longitude': 2.179215,
      'provider': {
        'name': 'Gecco',
        'app': {
          'android': 'https://play.google.com/store/apps/details?id=es.gecco',
          'ios': 'https://apps.apple.com/app/id1516642624'
        }
      },
      'battery': 30,
      'walkTime': 326.7,
      'driveTime': 628.9,
      'totalTravelTime': 955.5999999999999
    },
    {
      'id': 'eWVnbzpNT1RPUlNDT09URVI6NzQw',
      'publicId': null,
      'type': 'MOTORSCOOTER',
      'latitude': 41.390422,
      'longitude': 2.177015,
      'provider': {
        'name': 'Yego',
        'app': {
          'android': 'https://play.google.com/store/apps/details?id=com.getyugo.app',
          'ios': 'https://itunes.apple.com/appid1181020675?mt=8'
        }
      },
      'battery': 50,
      'walkTime': 260.9,
      'driveTime': 738.5,
      'totalTravelTime': 999.4
    },
    {
      'id': 'Z2VjY286TU9UT1JTQ09PVEVSOkVTLUItRzAwNTE3',
      'publicId': 'C5955BWH',
      'type': 'MOTORSCOOTER',
      'latitude': 41.395893,
      'longitude': 2.178968,
      'provider': {
        'name': 'Gecco',
        'app': {
          'android': 'https://play.google.com/store/apps/details?id=es.gecco',
          'ios': 'https://apps.apple.com/app/id1516642624'
        }
      },
      'battery': 39,
      'walkTime': 326.3,
      'driveTime': 678,
      'totalTravelTime': 1004.3
    },
    {
      'id': 'b2l6Ok1PVE9SU0NPT1RFUjp2XzNxdmVhNXZoazV1bXFhN24zNG5o',
      'publicId': 'XXX072',
      'type': 'MOTORSCOOTER',
      'latitude': 41.395469999999996,
      'longitude': 2.17657,
      'provider': {
        'name': 'OIZ',
        'app': {
          'android': 'https://play.google.com/store/apps/details?id=com.oizbike.app',
          'ios': 'https://itunes.apple.com/app/id1525687104'
        }
      },
      'battery': 87,
      'walkTime': 361.2,
      'driveTime': 648.4,
      'totalTravelTime': 1009.5999999999999
    },
    {
      'id': 'c2VhdG1vdG9zaGFyaW5nOk1PVE9SU0NPT1RFUjo5YWI2ODE3MC1mMTcxLTQ1NWItYjBjMy02NzM2YWUyZjUxNjY=',
      'publicId': null,
      'type': 'MOTORSCOOTER',
      'latitude': 41.392989,
      'longitude': 2.175403,
      'provider': {
        'name': 'SEAT MÓtosharing',
        'app': {
          'android': 'https://play.google.com/store/apps/details?id=seat.code.emobility.seatmo',
          'ios': 'https://itunes.apple.com/app/id1497902704'
        }
      },
      'battery': 41,
      'walkTime': 358.7,
      'driveTime': 680.6,
      'totalTravelTime': 1039.3
    },
    {
      'id': 'b2l6Ok1PVE9SU0NPT1RFUjp2XzNxdmVhMW1kZW15cHQ0eXpzZTZo',
      'publicId': 'XXX306',
      'type': 'MOTORSCOOTER',
      'latitude': 41.39431,
      'longitude': 2.17563,
      'provider': {
        'name': 'OIZ',
        'app': {
          'android': 'https://play.google.com/store/apps/details?id=com.oizbike.app',
          'ios': 'https://itunes.apple.com/app/id1525687104'
        }
      },
      'battery': 89,
      'walkTime': 333.1,
      'driveTime': 716.7,
      'totalTravelTime': 1049.8000000000002
    },
    {
      'id': 'aWJlcnNjb3Q6TU9UT1JTQ09PVEVSOnZfM3F2ZWE2NmVnbnJrbnFlcHpyNTE=',
      'publicId': 'XXX075',
      'type': 'MOTORSCOOTER',
      'latitude': 41.393299999999996,
      'longitude': 2.17558,
      'provider': {
        'name': 'Iberscot',
        'app': {
          'android': 'https://play.google.com/store/apps/details?id=net.iberscot.app',
          'ios': 'https://itunes.apple.com/app/id1513924750'
        }
      },
      'battery': 76,
      'walkTime': 357.9,
      'driveTime': 733.3,
      'totalTravelTime': 1091.1999999999998
    }
  ]
;
  const [viewport, setViewport] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    latitude: 41.39269797901637,
    longitude: 2.1796737644098707,
    zoom: 16,
  });

  useEffect(() => {
    for (let i = 0; i < motoStoreCopy.length; i++) {
      for (let j = 0; j < userStore.providers.length; j++) {
        if (motoStoreCopy[i].provider.name === userStore.providers[j].name) {
          if (userStore.providers[j].isFiltered) {
            setMotosFilteredByProviders((prev) => [...prev, motoStoreCopy[i]]);
          }
        }
      }
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [motoStore]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleClickedMoto(moto: Moto, i: number, motoProviderInfo: any) {
    setIsMotoInfoClicked(true);
    setMotoInfo(moto);
    setMotoIndex(i);
    setMotoProvider(motoProviderInfo);
  }

  function handleClickedScreen() {
    setIsMotoInfoClicked(false);
  }
  const handleChangeDestination = () => {
    dispatch({
      type: GET_DESTINATION_COORDINATES_AND_MOTOS,
      availableMotos: [],
    });
    dispatch(setCurrentDestination({ destination: '', label: '' }));
    setMotosFilteredByProviders([]);
    history.push('/destination');
  };
  const handleChangeProviders = () => {
    setMotosFilteredByProviders([]);
    history.push('/providers');
  };

  if (isLoading) {
    return (
      <LoaderMap>
        <PulseLoader
          css=""
          margin={6}
          size={20}
          color="#303f9f"
          loading={isLoading}
        />
      </LoaderMap>
    );
  }

  return (
    <ContainerDiv>
      <ThemeProvider theme={theme}>
        <HeaderDiv>
          <HamburgerMenu />
          <HeaderRight>
            <CircleIcon color="primary">
              <DirectionsIcon
                color="primary"
                fontSize="large"
                onClick={handleChangeDestination}
              />
            </CircleIcon>
            <CircleIcon>
              <FilterListIcon
                color="primary"
                fontSize="large"
                onClick={handleChangeProviders}
              />
            </CircleIcon>
          </HeaderRight>
        </HeaderDiv>
      </ThemeProvider>
      <MapDiv>
        <ReactMapGL
          {...viewport}
          onClick={() => handleClickedScreen()}
          onViewportChange={(nextViewport) => setViewport(nextViewport)}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          mapStyle={MAPBOX_STYLE}
        >
          <Marker
            latitude={
              userStore.destinationCoordinates &&
              userStore.destinationCoordinates.destinationLatitude
            }
            longitude={
              userStore.destinationCoordinates &&
              userStore.destinationCoordinates.destinationLongitude
            }
          >
            {viewport.zoom > 17 ? <p>{destinationStore.destination}</p> : null}

            <PinDropIcon style={{ width: '30px', height: '30px' }} />
          </Marker>
          <Marker latitude={41.39269797901637} longitude={2.1796737644098707}>
            <Pin />
          </Marker>
          {motosFilteredByProviders?.map((moto: Moto, i: number) => {
            const { provider } = moto;
            return (
              <Marker
                key={moto.id}
                latitude={moto.latitude}
                longitude={moto.longitude}
              >
                {i === 0 && !moto.isIncomming ? (
                  <SelectedMotoDiv>
                    {viewport.zoom > 17 ? (
                      <img
                        src={providerStore[provider.name].logo}
                        alt="provider logo"
                        style={{ height: '20px' }}
                      />
                    ) : null}
                    <img
                      src={motoRecommended}
                      alt="provider moto"
                      style={{ height: '45px' }}
                      onClickCapture={() =>
                        handleClickedMoto(moto, i, providerStore[provider.name])
                      }
                    />
                  </SelectedMotoDiv>
                ) : i === 0 && moto.isIncomming ? (
                  <NormalMotoDiv>
                    {viewport.zoom > 17 ? (
                      <img
                        src={providerStore[provider.name].logo}
                        alt="provider logo"
                        style={{ height: '20px' }}
                      />
                    ) : null}
                    <img
                      src={incommingMoto}
                      alt="provider moto"
                      style={{ height: '30px' }}
                      onClickCapture={() =>
                        handleClickedMoto(moto, i, providerStore[provider.name])
                      }
                    />
                  </NormalMotoDiv>
                ) : i > 0 && !moto.isIncomming ? (
                  <NormalMotoDiv>
                    {viewport.zoom > 17 ? (
                      <img
                        src={providerStore[provider.name].logo}
                        alt="provider logo"
                        style={{ height: '20px' }}
                      />
                    ) : null}
                    <img
                      src={providerStore[provider.name].moto}
                      alt="provider moto"
                      style={{ height: 35 }}
                      onClickCapture={() =>
                        handleClickedMoto(moto, i, providerStore[provider.name])
                      }
                    />
                  </NormalMotoDiv>
                ) : i > 0 && moto.isIncomming ? (
                  <NormalMotoDiv>
                    {viewport.zoom > 17 ? (
                      <img
                        src={providerStore[provider.name].logo}
                        alt="provider logo"
                        style={{ height: '20px' }}
                      />
                    ) : null}
                    <img
                      src={incommingMoto}
                      alt="provider logo"
                      style={{ height: 35 }}
                      onClickCapture={() =>
                        handleClickedMoto(moto, i, providerStore[provider.name])
                      }
                    />
                  </NormalMotoDiv>
                ) : null}
              </Marker>
            );
          })}

          {isMotoInfoClicked && (
            <MotoContainerWrapper>
              <MotoContainerDiv>
                {motoIndex === 0 ? (
                  <>
                    <BestMotoImage
                      src={lightening}
                      alt="lightening"
                    />
                  </>
                ) : null }
                <MotoInfo
                  moto={motoInfo}
                  motoIndex={motoIndex}
                  motoProvider={motoProvider}
                />
              </MotoContainerDiv>
            </MotoContainerWrapper>
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
