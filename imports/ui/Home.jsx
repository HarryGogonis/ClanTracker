import React, { Component } from 'react';
import { Link } from 'react-router';

import RaisedButton from 'material-ui/RaisedButton';

export default class Home extends Component {
  render() {
    return (
      <div className="container">

        <h2>Welcome to ClanTracker!</h2>

        <p className="lead">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Vestibulum id pharetra diam, quis mattis eros.
          Praesent quis accumsan tortor, eget faucibus tellus.
          Curabitur a purus sapien. Etiam facilisis mi quis arcu egestas, ut interdum nisi ultrices.
          Phasellus luctus elementum mauris at gravida. Praesent suscipit ultrices dapibus.
          Pellentesque non porttitor tortor.
        </p>

        <div className="row">
          <div className="col s6">
            <RaisedButton
              label="Clan List"
              containerElement={<Link to="/clans" />}
              linkButton
              primary
            />
          </div>
          <div className="col s6">
            <Link to="/clans/create">
              <RaisedButton label="Create Clan" secondary />
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
