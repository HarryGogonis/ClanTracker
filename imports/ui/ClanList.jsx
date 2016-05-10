import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { browserHistory } from 'react-router';
import Title from 'react-title-component';

import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn }
  from 'material-ui/Table';

import { Clans } from '../api/clans.js';

const styles = {
  row: {
    cursor: 'pointer',
  },
};

class ClanList extends Component {

  constructor(props) {
    super(props);

    this.handleSelectRow = this.handleSelectRow.bind(this);
  }

  handleSelectRow(pos) {
    const clan = this.props.clans[pos[0]];
    browserHistory.push(`/clans/${clan._id}`);
  }

  renderClans() {
    return this.props.clans.map((clan, index) => (
      <TableRow
        key={clan._id}
        ref="clan"
        value={clan._id}
        style={styles.row}
      >
        <TableRowColumn>{index + 1}</TableRowColumn>
        <TableRowColumn style={{ fontWeight: 500 }}>
          {clan.name} [{clan.tag}]
        </TableRowColumn>
        <TableRowColumn>0</TableRowColumn>
        <TableRowColumn>0</TableRowColumn>
        <TableRowColumn>0</TableRowColumn>
      </TableRow>
    ));
  }

  render() {
    return (
      <div className="container">
        <Title render={previousTitle => `${previousTitle} - Clan List`} />

        <Table
          onRowSelection={this.handleSelectRow}
        >
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableHeaderColumn>Rank</TableHeaderColumn>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Member Count</TableHeaderColumn>
              <TableHeaderColumn>Combat AVG</TableHeaderColumn>
              <TableHeaderColumn>Skill AVG</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
            showRowHover
          >
            {this.renderClans()}
          </TableBody>
        </Table>
      </div>
    );
  }
}

ClanList.propTypes = {
  clans: PropTypes.array.isRequired,
};

export default createContainer(() => ({
  clans: Clans.find({}).fetch(),
}), ClanList);
