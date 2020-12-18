import logos from '../assets/logos';
import images from '../assets/images';

interface ProviderStoreI {
  [key: string]: ProviderI;
}
export interface ProviderI {
  color: string;
  logo: string;
  price: number;
  moto: string;
}
const providerStore: ProviderStoreI = {
  Acciona: {
    color: '#FF0100',
    logo: logos.logoAcciona,
    price: 0.26,
    moto: images.motoAcciona,
  },
  Avant: {
    color: '#1974BB',
    logo: logos.logoAvant,
    price: 0.14,
    moto: images.motoAvant,
  },
  Cityscoot: {
    color: '#0054BB',
    logo: logos.logoCityscoot,
    price: 0.26,
    moto: images.motoCityscoot,
  },
  Ecooltra: {
    color: '#73C1A1',
    logo: logos.logoEcooltra,
    price: 0.26,
    moto: images.motoEcooltra,
  },
  Gecco: {
    color: '#000',
    logo: logos.logoGecco,
    price: 0.28,
    moto: images.motoGecco,
  },
  Iberscot: {
    color: '#BF1E2E',
    logo: logos.logoIberscot,
    price: 0.25,
    moto: images.motoIberscot,
  },
  'SEAT MÓtosharing': {
    color: '#33302E',
    logo: logos.logoSeat,
    price: 0.26,
    moto: images.motoSeat,
  },
  TuCycleBarcelona: {
    color: '#661812',
    logo: logos.logoTucycle,
    price: 0.23,
    moto: images.motoTucycle,
  },
  OIZ: {
    color: '#00AEEF',
    logo: logos.logoOIZ,
    price: 0.24,
    moto: images.motoOIZ,
  },
  Yego: {
    color: '#28323C',
    logo: logos.logoYego,
    price: 0.25,
    moto: images.motoYego,
  },
};

export default providerStore;
