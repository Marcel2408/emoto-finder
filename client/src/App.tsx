import * as React from 'react';
import Favourites from './Components/Favourites';
import Login from './Components/Login';
import SelectDestination from './Components/SelectDestination';
import DestinationBar from './Containers/DestinationBar';
import HamburgerMenu from './Containers/HamburgerMenu';
import Map from './Containers/Map';
import MotoInfo from './Containers/MotoInfo';

const App: React.FC = () => {
  return (

    <div>
      <Favourites />
      <Login />
      <SelectDestination />
      <DestinationBar />
      <HamburgerMenu />
      <Map />
      <MotoInfo />
    </div>
  );
};

export default App;