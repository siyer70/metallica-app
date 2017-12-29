/**
 * In this file, we create a React component
 * which incorporates components provided by Material-UI.
 */
import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Tabs, Tab} from 'material-ui/Tabs';

import * as tradeActions from './actions';

import PageHeader from './../common/header';
import StatusIndicator from './../StatusIndicator/StatusIndicator';
import TickerComponent from './views/trade/tickercomponent';
import FeatureTabs from './views/trade/tabs';

const styles = {
  container: {
    marginTop: 0,
    paddingTop: 0,
  },
};

class TradeManager extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      version : "1.0",
      currentUser : "schandrasekhar@sapient.com"
    };

    this.muiTheme = getMuiTheme(lightBaseTheme);
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={this.muiTheme}>
        <div style={styles.container}>
          <StatusIndicator />
          <PageHeader />
          <TickerComponent />
          <FeatureTabs {...this.props}/>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default connect(
	function mapStateToProps(state){
		return {
      trades : state.trades,
      activeTrade : state.activeTrade
		}
	},
	function mapDispatchToProps(dispatch){
		return bindActionCreators(tradeActions, dispatch);
	}
)(TradeManager);

