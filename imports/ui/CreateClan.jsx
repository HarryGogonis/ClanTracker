import React, { Component } from 'react';
import Title from 'react-title-component';
import { browserHistory } from 'react-router';

import Formsy from 'formsy-react';
import FormsyText from 'formsy-material-ui/lib/FormsyText';
import RaisedButton from 'material-ui/RaisedButton';
import SelectFieldTimezone from './components/SelectFieldTimezone';

import { Clans, MIN_WORLD, MAX_WORLD } from '../api/clans.js';

// Test if a string can be made into an int
const isInt = (str) => /^\+?(0|[1-9]\d*)$/.test(str);

Formsy.addValidationRule('isWorld', (values, value) =>
  !value || // allow for empty string
  isInt(value) && parseInt(value, 10) >= MIN_WORLD
               && parseInt(value, 10) <= MAX_WORLD
);

const removeEmptyStrings = (obj) => {
  const newObj = {};
  Object.keys(obj).forEach((prop) => {
    if (obj[prop] !== '') newObj[prop] = obj[prop];
  });
  return newObj;
};

export default class CreateClan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      canSubmit: false,
    };

    this.submitForm = this.submitForm.bind(this);
    this.notifyFormError = this.notifyFormError.bind(this);
    this.enableButton = this.enableButton.bind(this);
    this.disableButton = this.disableButton.bind(this);
  }

  submitForm(data) {
    console.log('Form submit', removeEmptyStrings(data));
    Clans.insert(removeEmptyStrings(data), (error, id) => {
      if (error) {
        console.error(error);
      } else {
        console.log(id);
        browserHistory.push(`/clan/${id}`);
      }
    });
  }

  notifyFormError(data) {
    console.error('Form error:', data);
  }

  enableButton() {
    this.setState({
      canSubmit: true,
    });
  }

  disableButton() {
    this.setState({
      canSubmit: false,
    });
  }

  renderForm() {
    const errorMessages = {
      words: 'Please only use letters',
      numeric: 'Please provide a number',
      url: 'Please provide a valid URL',
      tag: 'Tag must be less than 8 characters',
      name: 'Name must be less than 32 characters',
      world: `Please insert a valid world ${MIN_WORLD} - ${MAX_WORLD}`,
    };

    return (
      <Formsy.Form
        onValid={this.enableButton}
        onInvalid={this.disableButton}
        onValidSubmit={this.submitForm}
        onInvalidSubmit={this.notifyFormError}
      >
        <div className="row">
          <div className="col">
            <FormsyText
              name="name"
              hintText="Zero Tolerance"
              floatingLabelText="Clan Name"
              validations="maxLength:32"
              validationError={errorMessages.name}
              required
              fullWidth
            />
          </div>
          <div className="col">
            <FormsyText
              name="tag"
              hintText="RoT"
              floatingLabelText="Tag"
              validations="maxLength:8"
              validationError={errorMessages.tag}
              required
              fullWidth
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <FormsyText
              name="website"
              hintText="http://www.yourclan.com"
              floatingLabelText="Website (optional)"
              validations="isUrl"
              validationError={errorMessages.url}
              fullWidth
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <FormsyText
              name="description"
              hintText="What is your clan all about? What are the requirements?"
              floatingLabelText="Description (optional)"
              multiLine
              rows={2}
              fullWidth
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <FormsyText
              name="homeworld"
              hintText="301"
              floatingLabelText="Home world (optional)"
              validations="isWorld"
              validationError={errorMessages.world}
              fullWidth
            />
          </div>
          <div className="col">
            <SelectFieldTimezone
              name="timezone"
              floatingLabelText="Timezone"
              fullWidth
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <RaisedButton
              type="submit"
              label="Submit"
              disabled={!this.state.canSubmit}
              primary
            />
          </div>
        </div>
      </Formsy.Form>
    );
  }

  render() {
    return (
      <div className="container">
        <Title render={previousTitle => `${previousTitle} - Create Clan`} />

        {this.renderForm()}
      </div>
    );
  }
}
