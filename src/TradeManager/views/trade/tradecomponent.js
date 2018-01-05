import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ContentCreate from 'material-ui/svg-icons/content/create';
import TradeViewComponent from './subcomponents/tradeviewcomponent';
import TradeEditComponent from './subcomponents/tradeeditcomponent';
const moment = require('moment');

class TradeComponent extends Component {
    constructor() {
        super();

        this.state = {
            editMode : false,
            isNewTrade : false,
        }

    }

    handleNewButtonClick() {
        this.setState({editMode:true, isNewTrade:true});
    }

    handleEditClick(event) {
        let tradeId = this.props.activeTrade.tradeBody.tradeId;
        if(tradeId && tradeId !== "0") {
            this.setState({editMode:true, isNewTrade:false});
            this.props.handlePostEditClick();
        } else {
            alert("Select a trade from the left panel and click edit");
        }
    }

    handleDeleteClick(event) {
        let tradeId = this.props.activeTrade.tradeBody.tradeId;
        if(tradeId && tradeId !== "0") {
            let yes = confirm("Do you want to delete this trade - Are you sure?");
            if(yes) this.props.deleteTrade(this.props.activeTrade.tradeBody.tradeId);
        }
    }

    handlePostSaveClick() {
        this.setState({editMode:false, isNewTrade:false});
        this.props.handlePostSaveClick();
    }

    handleCancelClick() {
        let yes = confirm("Your changes to this trade will be lost - Proceed?");
        if(yes) {
            this.setState({editMode:false, isNewTrade:false});
            this.props.handleCancelClick();
        }
    }

    fillDefaultValues() {
        return {
            tradeId : '0',
            tradeDate : moment().format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
            commodity : 'AL',
            counterparty : 'AAPL',
            side:'Buy',
            location : 'LON',
            price : 0.00,
            quantity : 0
        };
    }
 
    render() {
        let {tradeBody} = (this.state.isNewTrade) ? {tradeBody:{}} : this.props.activeTrade; 
        let {createNewTrade, updateTrade, deleteTrade, eventHandler} = this.props;                

        if(!tradeBody.tradeId) {
            tradeBody = this.fillDefaultValues();
        }

        let card1visibility = this.state.editMode?'none':'block';
        let card1style = {display: card1visibility};
        let card2visibility = (this.state.editMode)?'block':'none';
        let card2style = {display: card2visibility};
        let title = "Trade ID: " + tradeBody.tradeId;
        let titleStyle = {fontSize: "12px", color:"#000000", fontWeight: 'bold'};
        return (
            <div>
                <AppBar
                    title={title}
                    titleStyle={titleStyle}
                    showMenuIconButton={false}
                    style = {{backgroundColor:"#F5F5F5"}}
                    iconElementRight={<div><IconButton ref="btnEdit" disabled={this.state.editMode} onClick={this.handleEditClick.bind(this)}><ContentCreate /></IconButton><IconButton ref="btnDelete" disabled={this.state.editMode} onClick={this.handleDeleteClick.bind(this)}><ActionDelete /></IconButton></div>}
                />
                <div style={card1style}>
                    <TradeViewComponent key={tradeBody.tradeId} tradeBody={tradeBody} 
                            refdata = {this.props.refdata} />
                </div>
 
                <div style={card2style}>
                    <TradeEditComponent key={tradeBody.tradeId}
                            isNewTrade={this.state.isNewTrade}
                            handlePostSaveClick={this.handlePostSaveClick.bind(this)}
                            handleCancelClick={this.handleCancelClick.bind(this)}
                            refdata = {this.props.refdata} 
                            {...{tradeBody, createNewTrade, updateTrade, deleteTrade, eventHandler}} />
                </div>
            </div>
        );
    }
}

export default TradeComponent;
