import React, {Component}  from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import SearchComponent from './searchcomponent';
import Divider from 'material-ui/Divider';
import TradeListComponent from './tradelistcomponent';
import TradeComponent from './tradecomponent';

const tabStyles = {
    tabHeading: {
      fontSize: 24,
      paddingTop: 16,
      marginBottom: 12,
      fontWeight: 400,
    },
};

export default class FeatureTabs extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {trades, activeTrade, createNewTrade, 
            updateTrade, deleteTrade, loadTrades, 
            queryTrades, queryTrade, setActiveTrade} = this.props;
            
        return (
            <div>
                <Tabs >
                    <Tab label="TRADES" style={{backgroundColor:"#F5F5F5", color:"#000000"}}>
                        <div>
                            <Divider />
                            <SearchComponent loadTrades={loadTrades} queryTrades={queryTrades} />
                            <table>
                                <tbody>
                                    <tr>
                                        <td width="65%" style={{verticalAlign:'top'}}>
                                            <TradeListComponent {...{trades, setActiveTrade, deleteTrade}} />
                                        </td>
                                        <td width="35%" height="60%" style={{verticalAlign:'top'}}>
                                            <TradeComponent {...{createNewTrade, updateTrade, 
                                                deleteTrade, activeTrade}}/>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </Tab>
                    <Tab label="TRANSFERS" style={{backgroundColor:"#F5F5F5", color:"#000000"}}>
                        <div>
                            <h2> Tab Two</h2>
                        </div>
                    </Tab>
                    <Tab label="TRANSPORTS" style={{backgroundColor:"#F5F5F5", color:"#000000"}}>
                        <div>
                            <h2> Tab Three</h2>
                        </div>
                    </Tab>
                </Tabs>
            </div>
        );
    }

};
