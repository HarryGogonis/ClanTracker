import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { browserHistory, Link } from 'react-router';
import { Meteor } from 'meteor/meteor';
import Title from 'react-title-component';

import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Formsy from 'formsy-react';
import Divider from 'material-ui/Divider';
import FormsyText from 'formsy-material-ui/lib/FormsyText';
import ActionDeleteForever from 'material-ui/svg-icons/action/delete-forever';
import ActionUpdate from 'material-ui/svg-icons/action/update';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';

import ClanPlayers from './ClanPlayers';

import { Clans } from '../api/clans.js';
import { Players } from '../api/players.js';

class Clan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      canSubmit: false,
    };

    this.deleteClan = this.deleteClan.bind(this);
    this.updateClan = this.updateClan.bind(this);
    this.submitAddMemberForm = this.submitAddMemberForm.bind(this);
    this.notifyAddMemberFormError = this.notifyAddMemberFormError.bind(this);
    this.enableAddMemberButton = this.enableAddMemberButton.bind(this);
    this.disableAddMemberButton = this.disableAddMemberButton.bind(this);
  }

  deleteClan() {
    const clan = this.props.clan;
    if (confirm(`Really delete clan ${clan.name}`)) {
      Clans.remove({ _id: clan._id });
      browserHistory.push('/clans');
    }
  }

  updateClan() {
    const clanId = this.props.clan._id;
    Meteor.call('clans.update', clanId);
  }

  submitAddMemberForm(data) {
    console.log('Form submit', data);

    this.refs.memberInput.setState({
      value: '',
    });

    const player = {
      name: data.name,
      clans: [this.props.clan._id],
    };

    Players.insert(player, (error, playerId) => {
      if (error) {
        console.error(error);
      } else {
        Meteor.call('players.update', playerId);
      }
    });
    // Players.upsert({ name }, { $addToSet: { clans: clanId } });
  }

  notifyAddMemberFormError(data) {
    console.error('Form error:', data);
  }

  enableAddMemberButton() {
    this.setState({
      canSubmit: true,
    });
  }

  disableAddMemberButton() {
    this.setState({
      canSubmit: false,
    });
  }

  renderClanSidebar() {
    const clan = this.props.clan;
    return (
      <Card>
        <CardText>
          <p>
            {clan.description}
          </p>

          <Divider />

          <h4><label>Home world</label> {clan.homeworld}</h4>
          <h4><b>Timezone</b> {clan.timezone}</h4>
        </CardText>
        <CardActions>
          <FlatButton
            label="Delete"
            linkButton
            onClick={this.deleteClan}
            icon={<ActionDeleteForever />}
          />
          <RaisedButton
            label="Update"
            linkButton
            onClick={this.updateClan}
            icon={<ActionUpdate />}
          />
        </CardActions>
      </Card>
    );
  }

  renderClanBanner() {
    const clan = this.props.clan;
    const ClanCardTitle = (
      <CardTitle
        title={clan.name}
        subtitle={<a href={clan.website}>{clan.website}</a>}
      />
    );

    return (
      <Card>
        <CardMedia overlay={ClanCardTitle}>
          <img src="http://i.imgur.com/LWXqI3b.png" alt="banner" />
        </CardMedia>
      </Card>
    );
  }


  render() {
    const {
      clan,
    } = this.props;

    return (
      <div className="container">
        <Title render={previousTitle => `${previousTitle} - ${clan.name}`} />

        <div className="row">
          <div className="col">
            <Link to="/clans">
              <FlatButton
                label="Back to clan list"
                linkButton
                icon={<NavigationArrowBack />}
              />
            </Link>
          </div>
        </div>

        <div className="row">
          <div className="col">
            {this.renderClanBanner()}
          </div>
        </div>

        <div className="row">
          <div className="col">
            <div className="row">
              <div className="col clan-players">
                <h2>Members</h2>
                <ClanPlayers clanId={clan._id} />
              </div>
            </div>

            <Formsy.Form
              onValid={this.enableAddMemberButton}
              onInvalid={this.disableAddMemberButton}
              onValidSubmit={this.submitAddMemberForm}
              onInvalidSubmit={this.notifyAddMemberFormError}
              className="row sm"
              style={{ alignItems: 'flex-end' }}
            >
              <div className="col">
                <FormsyText
                  name="name"
                  hintText="Zezima"
                  floatingLabelText="New Member name"
                  ref="memberInput"
                  required
                  fullWidth
                />
              </div>
              <div className="col static">
                <RaisedButton
                  type="submit"
                  label="Add"
                  primary
                  disabled={!this.state.canSubmit}
                />
              </div>
            </Formsy.Form>
          </div>

          <div className="col clan-sidebar">
            {this.renderClanSidebar()}
          </div>
        </div>
      </div>
    );
  }
}

Clan.propTypes = {
  clan: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
};

export default createContainer((props) => {
  const _id = props.params.clanId;
  return {
    clan: Clans.findOne({ _id }),
  };
}, Clan);
