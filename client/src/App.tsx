import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import Favourites from './Components/Favourites';
import Login from './Components/Login';
import SelectDestination from './Components/SelectDestination';
import Map from './Containers/Map';

const App: React.FC = () => {
  return (


    <Switch>
      <Route
        exact
        path='/favourites'
        component={Favourites}
      />
      <Route
        exact
        path='/'
        component={Login}
      />
      <Route
        exact
        path='/map'
        component={Map}
      />
      <Route
        exact
        path='/select_destination'
        component={SelectDestination}
      />
    </Switch>

  );
};

export default App;