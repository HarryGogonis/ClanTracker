import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import App from './App.jsx';
import ClanList from './ClanList.jsx';
import CreateClan from './CreateClan.jsx';
import Clan from './Clan.jsx';
import Home from './Home.jsx';
import NoMatch from './NoMatch.jsx';

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="/clans" component={ClanList} />
      <Route path="/clans/create" component={CreateClan} />
      <Route path="/clans/:clanId" component={Clan} />
      <Route path="*" component={NoMatch} />
    </Route>
  </Router>
);
