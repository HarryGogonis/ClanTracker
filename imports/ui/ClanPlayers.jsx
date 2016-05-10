import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow }
  from 'material-ui/Table';

import { Players } from '../api/players.js';
import Player from './Player.jsx';

class ClanPlayers extends Component {

  renderPlayers() {
    console.log(this.props.players);
    return this.props.players.map((player, index) => (
      <Player player={player} key={player._id} rank={index + 1} />
    ));
  }

  render() {
    return (
      <Table>
        <TableHeader
          displaySelectAll={false}
          adjustForCheckbox={false}
        >
          <TableRow>
            <TableHeaderColumn className="skill">#</TableHeaderColumn>
            <TableHeaderColumn className="playerName">Name</TableHeaderColumn>
            <TableHeaderColumn className="skill">CMB</TableHeaderColumn>
            <TableHeaderColumn className="skill">Att</TableHeaderColumn>
            <TableHeaderColumn className="skill">Def</TableHeaderColumn>
            <TableHeaderColumn className="skill">Str</TableHeaderColumn>
            <TableHeaderColumn className="skill">HP</TableHeaderColumn>
            <TableHeaderColumn className="skill">Range</TableHeaderColumn>
            <TableHeaderColumn className="skill">Pray</TableHeaderColumn>
            <TableHeaderColumn className="skill">Mage</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {this.renderPlayers()}
        </TableBody>
      </Table>
    );
  }
}

ClanPlayers.propTypes = {
  players: PropTypes.array.isRequired,
  clanId: PropTypes.string.isRequired,
};

export default createContainer((props) => ({
  players: Players.find({
    clans: props.clanId,
  }).fetch(),
}), ClanPlayers);
