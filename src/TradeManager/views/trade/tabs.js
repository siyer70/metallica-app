import React, {Component}  from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import SearchComponent from './searchcomponent';
import Divider from 'material-ui/Divider';
import TradeContainer from './tradecontainer';
import TradeListComponent from './tradelistcomponent';
import TradeComponent from './tradecomponent';
import refdataQueryService from './../../services/refdataQueryService';

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
        let commodities = refdataQueryService.loadCommodities();
        let locations = refdataQueryService.loadLocations();      
        let counterparties = refdataQueryService.loadCounterparties();
        this.refdata = {commodities, locations, counterparties};
        this.commodityLoaded = false;
        this.locationsLoaded = false;
        this.cpLoaded = false;
        this.state = {
            refdataLoaded : false
        }
    }

    loadReferenceData() {
        
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
                            <SearchComponent ref="searchComponent" loadTrades={loadTrades} queryTrades={queryTrades} refdata={this.refdata}/>
                            <TradeContainer ref="tradeContainer" {...this.props} />
                        </div>
                    </Tab>
                    <Tab label="TRANSFERS" style={{backgroundColor:"#F5F5F5", color:"#000000"}}>
                        <div>
                            <h2>Requirement awaited - This feature is under construction</h2>
                        </div>
                    </Tab>
                    <Tab label="TRANSPORTS" style={{backgroundColor:"#F5F5F5", color:"#000000"}}>
                        <div>
                            <h2>Requirement specification awaited - This feature is under construction</h2>
                        </div>
                    </Tab>
                </Tabs>
            </div>
        );
    }

};
