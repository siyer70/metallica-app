/**
 * In this file, we create a React component
 * which incorporates components provided by Material-UI.
 */
import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as tradeActions from './actions';

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

class TradeManager extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      open : false,
      version : "1.0",
      currentUser : "schandrasekhar@sapient.com"
    };
  }

  render() {
    // let {trades, createNewTrade, 
    //   updateTrade, deleteTrade, loadTrades, 
    //   queryTrades, queryTrade, setActiveTrade} = this.props;
    
    let title = `Metallica Application Version ${this.state.version} - Environment: ${process.env.NODE_ENV || 'development'}`;
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

