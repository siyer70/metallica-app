/**
 * In this file, we create a React component
 * which incorporates components provided by Material-UI.
 */
import React, {Component} from 'react';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import AccountCircle from 'material-ui/svg-icons/action/account-circle';
import {Tabs, Tab} from 'material-ui/Tabs';
import TickerComponent from './views/trade/tickercomponent';
import FeatureTabs from './views/trade/tabs';

const styles = {
  container: {
    marginTop: 0,
    paddingTop: 0,
  },
};

const muiTheme = getMuiTheme(lightBaseTheme);

export default class TradeManager extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      open : false,
      version : 1.0,
      currentUser : "schandrasekhar@sapient.com"
    };
  }

  render() {
    let title = `Metallica Application (version: ${this.state.version}) Environment: ${process.env.NODE_ENV || 'Development'}`;
    let titleStyle = {fontSize: "16px"};
    let contentStyle = {fontSize: "16px", color:"#ffffff"};
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={styles.container}>
          <AppBar
              title={title}
              titleStyle={titleStyle}
              iconElementRight={<div><span style={contentStyle}>User: {this.state.currentUser}</span><IconButton><AccountCircle /></IconButton></div>}
              />
          <TickerComponent />
          <FeatureTabs />
        </div>
      </MuiThemeProvider>
    );
  }
}
