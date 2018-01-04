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
        this.commodities = {};
        this.locations = {};
        this.counterparties = {};
        this.refdata = {commodities:{}, locations:{}, counterparties:{}};
        this.state = {
            refdataLoaded : false
        }
        this.loadReferenceData();
    }

    loadReferenceData() {
        let promises = [];
        promises.push(refdataQueryService.loadCommodities());
        promises.push(refdataQueryService.loadLocations());      
        promises.push(refdataQueryService.loadCounterparties());
        Promise.all(promises).then(values => {
            this.commodities = this.buildMap(values[0]);
            this.locations = this.buildMap(values[1]);
            this.counterparties = this.buildMap(values[2]);
            this.refdata = {commodities : this.commodities, 
                            locations : this.locations,
                            counterparties : this.counterparties
                            };
            this.setState({refdataLoaded : true});
        });
    }

    buildMap(values) {
        let map = {};
        values.forEach(row => {
            map[row.code] = row;
        });
        return map;
    }

    render() {
        let {loadTrades, queryTrades} = this.props;
            
        return (
            <div>
                <Tabs >
                    <Tab label="TRADES" style={{backgroundColor:"#F5F5F5", color:"#000000"}}>
                        <div>
                            <Divider />
                            <SearchComponent ref="searchComponent" 
                                key={'searchwithrefdata:'+this.state.refdataLoaded} 
                                loadTrades={loadTrades} queryTrades={queryTrades} 
                                refdata={this.refdata} />
                            <TradeContainer ref="tradeContainer" 
                                key={'containerwithrefdata:'+this.state.refdataLoaded} 
                                refdata={this.refdata} {...this.props} />
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
