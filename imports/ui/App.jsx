import React, { Component, PropTypes } from 'react';
import { browserHistory, Router, Route, Link } from 'react-router';
import Title from 'react-title-component';
import Dimensions from 'react-dimensions';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { spacing, typography, transitions } from 'material-ui/styles';
import theme from './theme.js';

import AppDrawer from './components/AppDrawer';
import Footer from './components/Footer';

const styles = {
  logo: {
    color: typography.textFullWhite,
    lineHeight: `${spacing.desktopKeylineIncrement}px`,
    fontWeight: typography.fontWeightLight,
  },
  main: {
    flex: '1 0 auto',
    marginTop: '75px',
  },
  appBar: {
    position: 'fixed',
  },
};

const muiTheme = getMuiTheme(theme);

const MEDIUM = 992;

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      navDrawerOpen: false,
    };

    this.handleTouchTapLeftIconButton = this.handleTouchTapLeftIconButton.bind(this);
    this.handleChangeRequest = this.handleChangeRequest.bind(this);
  }

  handleTouchTapLeftIconButton() {
    this.setState({
      navDrawerOpen: !this.state.navDrawerOpen,
    });
  }

  handleChangeRequest(open) {
    this.setState({
      navDrawerOpen: open,
    });
  }

  render() {
    // Affix dock on medium/large screens
    let docked = false;
    let showMenuIconButton = true;

    let {
      navDrawerOpen,
    } = this.state;

    if (this.props.containerWidth >= MEDIUM) {
      docked = true;
      navDrawerOpen = true;
      showMenuIconButton = false;
    }

    // TODO refactor into styles + if statement
    const stateStyles = {
      fullWidth: {
        marginLeft: docked ? 256 : 0,
        transition: transitions.easeInOutFunction,
        display: 'flex',
        minHeight: '100vh',
        flexDirection: 'column',
        overflow: 'hidden',
      },
      appBarLeft: {
        display: docked ? 'none' : 'inline-block',
      },
    };

    // TODO change title on different pages
    const AppBarTitle = 'ClanTracker';

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <Title render="ClanTracker" />

          { /* TODO !!! Create custom Drawer component !!! */ }
          <Drawer
            open={navDrawerOpen}
            docked={docked}
            onRequestChange={this.handleChangeRequest}
          >
            <AppBar
              title={<Link to="/" style={styles.logo}>ClanTracker</Link>}
              zDepth={0}
              showMenuIconButton={false}
            />

            <MenuItem primaryText="Home" />

          </Drawer>

          <div style={stateStyles.fullWidth}>
            <AppBar
              title={AppBarTitle}
              onLeftIconButtonTouchTap={this.handleTouchTapLeftIconButton}
              showMenuIconButton={showMenuIconButton}
              zDepth={0}
              style={styles.appBar}
            />

            <main style={styles.main}>
              <ReactCSSTransitionGroup
                component="div"
                transitionName="example"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={500}
              >
                {React.cloneElement(this.props.children, {
                  key: this.props.location.pathname,
                })}
              </ReactCSSTransitionGroup>
            </main>

            <Footer />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

App.contextTypes = {
  router: PropTypes.object.isRequired,
};

App.propTypes = {
  children: PropTypes.node.isRequired,
  containerWidth: PropTypes.number.isRequired,
};

/* eslint new-cap: ["error", {"capIsNewExceptions": ["Dimensions"]}] */
export default Dimensions()(App);
