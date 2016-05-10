import React, { PropTypes } from 'react';
import { TableRow, TableRowColumn }
  from 'material-ui/Table';

const styles = {
  skill: {
    width: '2.5em',
  },
};

const Player = (props) => (
  <TableRow>
    <TableRowColumn className="skill">{props.rank}</TableRowColumn>
    <TableRowColumn className="playerName">{props.player.name}</TableRowColumn>
    <TableRowColumn className="skill">{props.player.combat}</TableRowColumn>
    <TableRowColumn className="skill">{props.player.skills.attack.level}</TableRowColumn>
    <TableRowColumn className="skill">{props.player.skills.defence.level}</TableRowColumn>
    <TableRowColumn className="skill">{props.player.skills.strength.level}</TableRowColumn>
    <TableRowColumn className="skill">{props.player.skills.hitpoints.level}</TableRowColumn>
    <TableRowColumn className="skill">{props.player.skills.ranged.level}</TableRowColumn>
    <TableRowColumn className="skill">{props.player.skills.prayer.level}</TableRowColumn>
    <TableRowColumn className="skill">{props.player.skills.magic.level}</TableRowColumn>
  </TableRow>
);

Player.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  player: PropTypes.object.isRequired,
  rank: PropTypes.number.isRequired,
};

export default Player;
