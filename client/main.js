import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { renderRoutes } from '../imports/ui/routes.jsx';

Meteor.startup(() => {
  injectTapEventPlugin();
  ReactDOM.render(
    renderRoutes(), document.getElementById('render-target'));
});
