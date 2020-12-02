import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import Favourites from '../features/Favourites';
import Login from '../features/Login';
import SelectDestination from '../features/SelectDestination';
import { Map } from '../components/Map';

const App: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/favourites" component={Favourites} />
      <Route exact path="/" component={Login} />
      <Route exact path="/map" component={Map} />
      <Route exact path="/destination" component={SelectDestination} />
    </Switch>
  );
};

export default App;
