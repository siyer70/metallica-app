import React, {Component} from 'react';
import {Card, CardText, CardActions} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';
import DropDownListComponent from './../../../custom-components/dropdownComponent';
import MenuItem from 'material-ui/MenuItem';
import areIntlLocalesSupported from 'intl-locales-supported';
import Checkbox from 'material-ui/Checkbox';
import css from './searchcomponent.css';
import tradeQueryService from '../../services/tradeQueryService';

const moment = require('moment');

class SearchComponent extends Component {

    constructor(props) {
        super(props);

        if (areIntlLocalesSupported(['en-GB']))
            this.DateTimeFormat = global.Intl.DateTimeFormat;
        else {
            const IntlPolyfill = require('intl');
            this.DateTimeFormat = IntlPolyfill.DateTimeFormat;
        }

        this.commodityItems = [];
        this.commodityItems.push(<MenuItem value={'AL'} key={'AL'} primaryText="Aluminium" />);
        this.commodityItems.push(<MenuItem value={'ZN'} key={'ZN'} primaryText="Zinc" />);
        this.commodityItems.push(<MenuItem value={'CU'} key={'CU'} primaryText="Copper" />);
        this.commodityItems.push(<MenuItem value={'AU'} key={'AU'} primaryText="Gold" />);
        this.commodityItems.push(<MenuItem value={'AG'} key={'AG'} primaryText="Silver" />);

        this.cpItems = [];
        this.cpItems.push(<MenuItem value={'ABCL'} key={'ABCL'} primaryText="ABCL" />);
        this.cpItems.push(<MenuItem value={'AAPL'} key={'AAPL'} primaryText="Apple" />);
        this.cpItems.push(<MenuItem value={'INFY'} key={'INFY'} primaryText="Infosys" />);

        this.locationItems = [];
        this.locationItems.push(<MenuItem value={'LON'} key={'LON'} primaryText="London" />);
        this.locationItems.push(<MenuItem value={'NYC'} key={'NYC'} primaryText="New York" />);
        this.locationItems.push(<MenuItem value={'SGP'} key={'SGP'} primaryText="Singapore" />);
    }

	componentDidMount(){
        this.queryTradesBasedOnCurrentCriteria();
    }
    
    disableWeekends(date) {
        return date.getDay() === 0 || date.getDay() === 6;
    }

    getBuySellSelection() {
        let a = this.refs.chkBuy.state.switched;
        let b = this.refs.chkSell.state.switched;

        let buySell = ((a && b) || (!a && !b))?'ALL':undefined;
        
        if(!buySell)
            buySell = (a)?'Buy':'Sell';

        return buySell;
    }

    queryTradesBasedOnCurrentCriteria() {
        let {loadTrades, queryTrades} = this.props;

        // convert from en-GB to API expected format YYYY-MM-DD
        let dtRange = [
            moment(this.refs.dtTradeFrom.refs.input.getValue(), 
                        "DD/MM/YYYY").format("YYYYMMDD"),
            moment(this.refs.dtTradeTo.refs.input.getValue(), 
                        "DD/MM/YYYY").format("YYYYMMDD")
        ].join();

        let qp = [
            dtRange,
            this.refs.ddlCommodity.state.value,
            this.getBuySellSelection(),
            this.refs.ddlCP.state.value,
            this.refs.ddlLocation.state.value
        ].join('/');
        
        console.log(qp);

        queryTrades(qp);
    }

    handleClick(event) {
        this.queryTradesBasedOnCurrentCriteria();
    }

    render() {
        let daterangeStyle = {fontSize: "12px", width: "175px"};
        let contentStyle = {fontSize: "12px"};
        let headerStyle = {fontSize: "12px", textAlign:'left'};
        return (
            <Card style={{marginBottom:"20px"}}>
                <CardText>
                <table width="100%">
                    <thead style={headerStyle}>
                        <tr>
                            <th width="25%">Trade Date</th>
                            <th width="20%">Commodity</th>
                            <th width="25%">Side</th>
                            <th width="15%">Counterparty</th>
                            <th width="15%">Location</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td width="25%">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <DatePicker
                                                    inputStyle = {contentStyle}
                                                    ref = "dtTradeFrom"
                                                    hintText="Trade From"
                                                    shouldDisableDate={this.disableWeekends}
                                                    autoOk = {true}
                                                    textFieldStyle = {{width:"75px"}}
                                                    formatDate={new this.DateTimeFormat('en-GB', {
                                                        day: 'numeric',
                                                        month: 'numeric',
                                                        year: 'numeric',
                                                    }).format}
                                                    defaultDate = {new Date()}
                                                />
                                            </td>
                                            <td>
                                                <span>to</span>
                                            </td>
                                            <td>
                                                <DatePicker
                                                    inputStyle = {contentStyle}
                                                    ref = "dtTradeTo"
                                                    hintText="Trade To"
                                                    shouldDisableDate={this.disableWeekends}
                                                    autoOk = {true}
                                                    textFieldStyle = {{width:"75px"}}
                                                    formatDate={new this.DateTimeFormat('en-GB', {
                                                        day: 'numeric',
                                                        month: 'numeric',
                                                        year: 'numeric',
                                                    }).format}
                                                    defaultDate = {new Date()}
                                                />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td width="20%">
                                <DropDownListComponent ref="ddlCommodity" items={this.commodityItems} defaultValue={'AL'} />
                            </td>
                            <td width="25%">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <Checkbox style={{color:"#F5F5F5"}} labelStyle = {contentStyle} ref="chkBuy" defaultChecked={true} label="Buy" style={{marginRight:15}} />
                                            </td>
                                            <td>
                                                <Checkbox labelStyle = {contentStyle} ref="chkSell" defaultChecked={true} label="Sell" style={{marginRight:15}} />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td width="15%">
                                <DropDownListComponent ref="ddlCP" items={this.cpItems} defaultValue={'AAPL'} />
                            </td>
                            <td width="15%">
                                <DropDownListComponent ref="ddlLocation" items={this.locationItems} defaultValue={'LON'} />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="3"></td>
                            <td colSpan="2" width="100%">
                                <FlatButton labelStyle = {contentStyle} label="Clear"/>
                                <FlatButton labelStyle = {contentStyle} label="Search" onClick={this.handleClick.bind(this)}/>
                            </td>
                        </tr>
                  </tbody>
                </table>
            </CardText>
          </Card>
        );
    }
}

export default SearchComponent;
