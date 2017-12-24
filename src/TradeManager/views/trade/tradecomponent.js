import React, {Component} from 'react';
import {Card, CardText, CardActions} from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ContentCreate from 'material-ui/svg-icons/content/create';
import DatePicker from 'material-ui/DatePicker';
import DropDownListComponent from './../../../custom-components/dropdownComponent';
import MenuItem from 'material-ui/MenuItem';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import areIntlLocalesSupported from 'intl-locales-supported';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import tradeCommandService from './../../services/tradeCommandService';

class TradeComponent extends Component {
    constructor() {
        super();

        if (areIntlLocalesSupported(['en-GB']))
            this.DateTimeFormat = global.Intl.DateTimeFormat;
        else {
            const IntlPolyfill = require('intl');
            this.DateTimeFormat = IntlPolyfill.DateTimeFormat;
        }

        this.state = {
            editMode : true,
            isNewTrade : false,
            tradeId : '',
            tradeDate : new Date().toString(),
            commodity : '',
            side : '',
            price : 0.00,
            quantity : 0,
            counterparty : '',
            location : ''
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

    disableWeekends(date) {
        return date.getDay() === 0 || date.getDay() === 6;
    }

    isFloat(n){
        return Number(n) === n && n % 1 !== 0;
    }
    
    isValidData() {
        let priceValue = this.refs.txtPrice.getValue();
        let qValue = this.refs.txtQuantity.getValue();

        if(isNaN(priceValue) || isNaN(qValue)) {
            alert("Price and Quantity should contain valid value");
            return false;
        }

        if(!Number.isInteger(parseFloat(qValue))) {
            alert("Quantity should be an Integer");
            return false;
        }

        if(parseFloat(priceValue) <= 0) {
            alert("Price should be greater than 0");
            return false;
        }
        
        if(parseInt(qValue) <= 0) {
            alert("Quantity should be greater than 0");
            return false;
        }

        return true;
    }

    handleClick(event) {

        if(!this.isValidData()) return;

        let priceValue = this.refs.txtPrice.getValue();
        let qValue = this.refs.txtQuantity.getValue();

        let tradeBody = {
            "commodity": this.refs.ddlCommodity.state.value,
            "side": this.refs.rbBuySell.state.selected,
            "price": parseFloat(priceValue),
            "quantity": parseInt(qValue),
            "counterparty": this.refs.ddlCP.state.value,
            "location": this.refs.ddlLocation.state.value,
            "status": "OPEN",
            "tradeDate": "2017-12-22T" + "00:00:00.000Z"
        };

        console.log(tradeBody);

        tradeCommandService
        .createNewTrade(tradeBody)
        .then(createdTradeData => {
            console.log("Trade created -> ", createdTradeData);

            let newTradeId = createdTradeData.tradeId; 

            tradeBody["quantity"] += 50; 

            tradeCommandService
            .updateTrade(newTradeId, tradeBody)
            .then(resTradeData => {
                console.log("Trade updated with + 50 quanity -> ", resTradeData);

                // tradeCommandService
                // .deleteTrade(newTradeId)
                // .then(resTradeData => {
                //     console.log("Trade deleted!", resTradeData);
                // });
                    
            });
                
        });
        
    }


    render() {
        let card1visibility = this.state.editMode?'none':'block';
        let card1style = {display: card1visibility};
        let card2visibility = (this.state.editMode)?'block':'none';
        let card2style = {display: card2visibility};
        let title = "Trade ID: " + this.state.tradeId;
        let contentStyle = {fontSize: "14px"};
        let titleStyle = {fontSize: "12px", color:"#000000", fontWeight: 'bold'};
        let rowStyle = {paddingBottom:"50px"};
        let colStyle = {paddingRight:"15px"};
        return (
            <div>
                <AppBar
                    title={title}
                    titleStyle={titleStyle}
                    showMenuIconButton={false}
                    style = {{backgroundColor:"#F5F5F5"}}
                    iconElementRight={<div><IconButton><ContentCreate /></IconButton><IconButton><ActionDelete /></IconButton></div>}
                />
                <div style={card1style}>
                <Card>
                    <CardText>
                        <table>
                            <tbody style={contentStyle}>
                                <tr style={rowStyle}>
                                    <td style={colStyle}>Trade Date</td>
                                    <td>{this.state.tradeDate}</td>
                                </tr>
                                <tr style={rowStyle}>
                                    <td style={colStyle}>Commodity</td>
                                    <td>{this.state.commodity}</td>
                                </tr>
                                <tr style={rowStyle}>
                                    <td style={colStyle}>Side</td>
                                    <td>{this.state.side}</td>
                                </tr>
                                <tr style={rowStyle}>
                                    <td style={colStyle}>Counterparty</td>
                                    <td>{this.state.counterparty}</td>
                                </tr>
                                <tr style={rowStyle}>
                                    <td style={colStyle}>Price</td>
                                    <td>{this.state.price}</td>
                                </tr>
                                <tr style={rowStyle}>
                                    <td style={colStyle}>Quantity</td>
                                    <td>{this.state.quantity}</td>
                                </tr>
                                <tr style={rowStyle}>
                                    <td style={colStyle}>Location</td>
                                    <td>{this.state.location}</td>
                                </tr>
                            </tbody>
                        </table>
                    </CardText>
                </Card>
                </div>

                <div style={card2style}>
                <Card>
                    <CardText>
                    <table width="100%">
                            <tbody style={contentStyle}>
                                <tr style={rowStyle}>
                                    <td style={colStyle}>Trade Date</td>
                                    <td>
                                        <DatePicker
                                            inputStyle = {contentStyle}
                                            ref = "dtTradeDate"
                                            hintText="Trade Date"
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
                                <tr style={rowStyle}>
                                    <td style={colStyle}>Commodity</td>
                                    <td>
                                        <DropDownListComponent ref="ddlCommodity" items={this.commodityItems} defaultValue={'AL'} />
                                    </td>
                                </tr>
                                <tr style={rowStyle}>
                                    <td style={colStyle}>Side</td>
                                    <td>
                                        <RadioButtonGroup ref="rbBuySell" name="buySell" defaultSelected="Buy">
                                            <RadioButton
                                                value="Buy"
                                                label="Buy"
                                                style={contentStyle}
                                            />
                                            <RadioButton
                                                value="Sell"
                                                label="Sell"
                                                style={contentStyle}
                                            />
                                        </RadioButtonGroup>
                                    </td>
                                </tr>
                                <tr style={rowStyle}>
                                    <td style={colStyle}>Counterparty</td>
                                    <td>
                                        <DropDownListComponent ref="ddlCP" items={this.cpItems} defaultValue={'AAPL'} />
                                    </td>
                                </tr>
                                <tr style={rowStyle}>
                                    <td style={colStyle}>Price</td>
                                    <td>
                                        <TextField
                                        ref="txtPrice"
                                        defaultValue={this.state.price}
                                        hintText="Enter Price"
                                        errorText="This field is required"
                                        />
                                    </td>
                                </tr>
                                <tr style={rowStyle}>
                                    <td style={colStyle}>Quantity</td>
                                    <td>
                                    <TextField
                                        ref="txtQuantity"
                                        defaultValue={this.state.price}
                                        hintText="Enter Quantity"
                                        errorText="This field is required"
                                        />
                                    </td>
                                </tr>
                                <tr style={rowStyle}>
                                    <td style={colStyle}>Location</td>
                                    <td>
                                        <DropDownListComponent ref="ddlLocation" items={this.locationItems} defaultValue={'LON'} />
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="2" width="100%" style={{textAlign:'right'}}>
                                        <RaisedButton labelStyle = {contentStyle} label="Cancel" secondary={true} style={{marginRight:"15px"}}/>
                                        <RaisedButton labelStyle = {contentStyle} label="Save" primary={true} onClick={this.handleClick.bind(this)}/>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </CardText>

                </Card>
                </div>
            </div>
        );
    }
}

export default TradeComponent;
