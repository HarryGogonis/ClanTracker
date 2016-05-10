import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

// Normalize timezone offset to account for DST
const getTimezoneOffset = () => {
  const d = new Date();
  const jan = new Date(d.getFullYear(), 0, 1);
  const jul = new Date(d.getFullYear(), 6, 1);
  return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
};

const tzOffset = getTimezoneOffset() / 60 * -1;

export default class SelectFieldTimezone extends React.Component {

  constructor(props) {
    super(props);
    this.state = { value: tzOffset };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, index, value) {
    this.setState({ value });
  }

  render() {
    return (
      <SelectField
        { ...this.props }
        value={this.state.value}
        onChange={this.handleChange}
      >
        <MenuItem
          value={-12}
          primaryText="(GMT-12) International Date Line West"
          label="GMT-12"
        />
        <MenuItem value={-11} primaryText="(GMT-11) Midway Island, Samoa" />
        <MenuItem value={-10} primaryText="(GMT-10) Hawaii" />
        <MenuItem value={-9} primaryText="(GMT-09) Alaska" />
        <MenuItem value={-8} primaryText="(GMT-08) Pacific Time (US & Canada)" />
        <MenuItem value={-7} primaryText="(GMT-07) Mountain Time (US & Canada)" />
        <MenuItem value={-6} primaryText="(GMT-06) Central America" />
        <MenuItem
          value={-5}
          primaryText="(GMT-05) Eastern Time (US & Canada)"
          label="EST"
        />
        <MenuItem value={-4} primaryText="(GMT-04) Atlantic Time (Canada)" />
        <MenuItem value={-3} primaryText="(GMT-03) Brasilia, Greenland" />
        <MenuItem value={-2} primaryText="(GMT-02)" />
        <MenuItem value={-1} primaryText="(GMT-01)" />
        <MenuItem
          value={0}
          primaryText="(GMT-00) Greenwich Mean Time"
          label="GMT-00"
        />


      </SelectField>
    );
  }
}
