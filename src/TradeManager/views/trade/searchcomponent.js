import React, {Component} from 'react';
import {Card, CardText, CardActions} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';
import DropDownListComponent from './../../../custom-components/dropdownComponent';
import MenuItem from 'material-ui/MenuItem';
import areIntlLocalesSupported from 'intl-locales-supported';
import Checkbox from 'material-ui/Checkbox';

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
        this.commodityItems.push(<MenuItem value={'ALL'} key={'ALL'} primaryText="All" />);
        Object.keys(this.props.refdata.commodities).forEach(key => {
                let commodity = this.props.refdata.commodities[key];
                this.commodityItems.push(<MenuItem value={commodity.code} key={commodity.code} primaryText={commodity.description} />)
        });

        this.locationItems = [];
        this.locationItems.push(<MenuItem value={'ALL'} key={'ALL'} primaryText="All" />);
        Object.keys(this.props.refdata.locations).forEach(key => {
                let location = this.props.refdata.locations[key];
                this.locationItems.push(<MenuItem value={location.code} key={location.code} primaryText={location.description} />)
        });


        this.cpItems = [];
        this.cpItems.push(<MenuItem value={'ALL'} key={'ALL'} primaryText="All" />);
        Object.keys(this.props.refdata.counterparties).forEach(key => {
                let cp = this.props.refdata.counterparties[key];
               this.cpItems.push(<MenuItem value={cp.code} key={cp.code} primaryText={cp.description} />)
        });

        this.state = {
            fromDate: new Date(),
            toDate: new Date(),
            buyChecked: true,
            sellChecked: true
        };

    }

    onFromDateChange(none, dateObj) {
        this.setState({fromDate: dateObj});
    }

    onToDateChange(none, dateObj) {
        this.setState({toDate: dateObj});
    }

    onBuyClick(event, isInputChecked) {
        this.setState({buyChecked: isInputChecked});
    }

    onSellClick(event, isInputChecked) {
        this.setState({sellChecked: isInputChecked});
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
        let {queryTrades} = this.props;

        let dtFrom = moment(this.refs.dtTradeFrom.refs.input.getValue(), 
                    "DD/MM/YYYY"); 
        let dtTo = moment(this.refs.dtTradeTo.refs.input.getValue(), 
                    "DD/MM/YYYY");
        
        let buySellSelection = this.getBuySellSelection();

                    // convert from en-GB to API expected format YYYY-MM-DD
        let dtRange = [
            dtFrom.format("YYYYMMDD"),
            dtTo.format("YYYYMMDD")
        ].join();

        let qp = [
            dtRange,
            this.refs.ddlCommodity.state.value,
            buySellSelection,
            this.refs.ddlCP.state.value,
            this.refs.ddlLocation.state.value
        ].join('/');
        
        let queryCriteriaAsJSON = {
            dateFrom : dtFrom,
            dateTo : dtTo,
            commodity : this.refs.ddlCommodity.state.value,
            side : buySellSelection,
            counterparty : this.refs.ddlCP.state.value,
            location : this.refs.ddlLocation.state.value
        };
        
        console.log(qp);
        console.log(queryCriteriaAsJSON);

        queryTrades({queryForAPICall : qp, queryJson : queryCriteriaAsJSON});
    }

    handleSearchClick(event) {
        this.queryTradesBasedOnCurrentCriteria();
    }

    handleClearClick(event) {
        let {queryTrades} = this.props;

        this.refs.ddlCommodity.setState({value:'ALL'});
        this.refs.ddlCP.setState({value:'ALL'});
        this.refs.ddlLocation.setState({value:'ALL'});
        this.setState({fromDate: new Date(), toDate: new Date(), buyChecked:true, sellChecked:true});

        // current values will only be refreshed after this function call completes, so cannot 
        // call queryTradesBasedOnCurrentCriteria directly as it picks the value form components
        let currentDate = new Date();
        currentDate.setHours(0,0,0,0);
        let dtFrom = moment(currentDate, 
                    "DD/MM/YYYY"); 
        let dtTo = moment(currentDate, 
                    "DD/MM/YYYY");
        
        let allValues = "ALL";
        let dtRange = [
            dtFrom.format("YYYYMMDD"),
            dtTo.format("YYYYMMDD")
        ].join();

        let qp = [
            dtRange,
            allValues,
            allValues,
            allValues,
            allValues
        ].join('/');
        
        let queryCriteriaAsJSON = {
            dateFrom : dtFrom,
            dateTo : dtTo,
            commodity : allValues,
            side : allValues,
            counterparty : allValues,
            location : allValues
        };
        
        console.log(qp);
        console.log(queryCriteriaAsJSON);

        queryTrades({queryForAPICall : qp, queryJson : queryCriteriaAsJSON});
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
                                                    value = {this.state.fromDate}
                                                    onChange = {this.onFromDateChange.bind(this)}
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
                                                    value = {this.state.toDate}
                                                    onChange = {this.onToDateChange.bind(this)}
                                                />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td width="20%">
                                <DropDownListComponent ref="ddlCommodity" items={this.commodityItems} defaultValue={'ALL'} />
                            </td>
                            <td width="25%">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <Checkbox style={{color:"#F5F5F5"}} labelStyle = {contentStyle} ref="chkBuy" checked={this.state.buyChecked} onCheck={this.onBuyClick.bind(this)} label="Buy" style={{marginRight:15}} />
                                            </td>
                                            <td>
                                                <Checkbox labelStyle = {contentStyle} ref="chkSell" checked={this.state.sellChecked} onCheck={this.onSellClick.bind(this)} label="Sell" style={{marginRight:15}} />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td width="15%">
                                <DropDownListComponent ref="ddlCP" items={this.cpItems} defaultValue={'ALL'} />
                            </td>
                            <td width="15%">
                                <DropDownListComponent ref="ddlLocation" items={this.locationItems} defaultValue={'ALL'} />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="3"></td>
                            <td colSpan="2" width="100%">
                                <FlatButton labelStyle = {contentStyle} label="Clear" onClick={this.handleClearClick.bind(this)}/>
                                <FlatButton labelStyle = {contentStyle} label="Search" onClick={this.handleSearchClick.bind(this)}/>
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
