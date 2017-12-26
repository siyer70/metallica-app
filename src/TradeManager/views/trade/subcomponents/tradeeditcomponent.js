import React, {Component} from 'react';
import {Card, CardText, CardActions} from 'material-ui/Card';
import DatePicker from 'material-ui/DatePicker';
import DropDownListComponent from './../../../../custom-components/dropdownComponent';
import MenuItem from 'material-ui/MenuItem';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import areIntlLocalesSupported from 'intl-locales-supported';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import tradeCommandService from './../../../services/tradeCommandService';
const moment = require('moment');

export default class TradeEditComponent extends Component {
    constructor(properties) {
        super(properties);

        let tradeDate = moment(this.props.tradeBody.tradeDate, "YYYY-MM-DDTHH:mm:ss.SSSZ").toDate();

        this.state = {
            tradeId : this.props.tradeBody.tradeId,
            tradeDate : tradeDate,
            commodity : this.props.tradeBody.commodity,
            counterparty : this.props.tradeBody.counterparty,
            side: this.props.tradeBody.side,
            location : this.props.tradeBody.location,
            price : this.props.tradeBody.price,
            quantity : this.props.tradeBody.quantity
        };

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

    handleSaveClick(event) {
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
            "tradeDate": moment(this.refs.dtTradeDate.state.date).format("YYYY-MM-DD")
                        + "T" + "00:00:00.000Z"
        };

        console.log(tradeBody);

        this.props.createNewTrade(tradeBody);
        
    }

    handleCancelClick(event) {
        this.setState({editMode:false});
    }

    handleOnChangeTradeDate(event, date) {
        this.setState({
            tradeDate: date
        });
    }
    
    handleOnChangePrice(event) {
        this.setState({price:event.target.value});
    }

    handleOnChangeQuantity(event) {
        this.setState({quantity:event.target.value});
    }

    render() {

        let contentStyle = {fontSize: "14px"};
        let rowStyle = {paddingBottom:"50px"};
        let colStyle = {paddingRight:"15px"};

        return (
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
                                        value = {this.state.tradeDate}
                                        onChange={this.handleOnChangeTradeDate.bind(this)}
                                    />
                                </td>
                            </tr>
                            <tr style={rowStyle}>
                                <td style={colStyle}>Commodity</td>
                                <td>
                                    <DropDownListComponent ref="ddlCommodity" items={this.commodityItems} defaultValue={this.state.commodity} />
                                </td>
                            </tr>
                            <tr style={rowStyle}>
                                <td style={colStyle}>Side</td>
                                <td>
                                    <RadioButtonGroup ref="rbBuySell" name="buySell" valueSelected={this.state.side}>
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
                                    <DropDownListComponent ref="ddlCP" items={this.cpItems} defaultValue={this.state.counterparty} />
                                </td>
                            </tr>
                            <tr style={rowStyle}>
                                <td style={colStyle}>Price</td>
                                <td>
                                    <TextField
                                    ref="txtPrice"
                                    value={this.state.price}
                                    onChange={this.handleOnChangePrice.bind(this)}
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
                                    value = {this.state.quantity}
                                    onChange={this.handleOnChangeQuantity.bind(this)}
                                    hintText="Enter Quantity"
                                    errorText="This field is required"
                                    />
                                </td>
                            </tr>
                            <tr style={rowStyle}>
                                <td style={colStyle}>Location</td>
                                <td>
                                    <DropDownListComponent ref="ddlLocation" items={this.locationItems} defaultValue={this.state.location} />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="2" width="100%" style={{textAlign:'right'}}>
                                    <RaisedButton labelStyle = {contentStyle} label="Cancel" secondary={true} onClick={this.handleCancelClick.bind(this)} style={{marginRight:"15px"}}/>
                                    <RaisedButton labelStyle = {contentStyle} label="Save" primary={true} onClick={this.handleSaveClick.bind(this)}/>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </CardText>
            </Card>
        );
    }
}
