/**
 * In this file, we create a React component
 * which incorporates components provided by Material-UI.
 */
import React, {Component} from 'react';
import { withRouter } from 'react-router'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {Tabs, Tab} from 'material-ui/Tabs';

import * as tradeActions from './actions';

import PageHeader from './../common/pageheader';
import StatusIndicator from './../StatusIndicator/StatusIndicator';
import TickerComponent from './views/trade/tickercomponent';
import FeatureTabs from './views/trade/tabs';
import EventHandler from './eventhandlers/EventHandler';

const styles = {
  container: {
    marginTop: 0,
    paddingTop: 0,
  },
};

class TradeManager extends Component {
  constructor(props, context) {
    super(props, context);
    this.eventHandler = new EventHandler();
  }

  render() {
    return (
        <div style={styles.container}>
          <TickerComponent eventHandler={this.eventHandler} />
          <FeatureTabs {...this.props} eventHandler={this.eventHandler} />
        </div>
    );
  }
}

export default withRouter(connect(
	function mapStateToProps(state){
		return {
      trades : state.trades,
      activeTrade : state.activeTrade,
		}
	},
	function mapDispatchToProps(dispatch){
		return bindActionCreators(tradeActions, dispatch);
	}
)(TradeManager));
