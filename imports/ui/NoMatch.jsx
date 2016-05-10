import React from 'react';
import { Link } from 'react-router';

import RaisedButton from 'material-ui/RaisedButton';
import ActionHome from 'material-ui/svg-icons/action/home';

const NoMatch = () => (
  <div className="container" style={{ fontSize: '125%' }}>
    <div className="row">
      <div className="col">
        <h2>404</h2>
        <h1>Page Not Found</h1>
      </div>
    </div>
    <div className="row">
      <div className="col">
        <Link to="/">
          <RaisedButton
            label="Home"
            primary
            icon={<ActionHome />}
          />
        </Link>
      </div>
    </div>
  </div>
);

export default NoMatch;
