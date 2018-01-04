import React, {Component} from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
    TableFooter,
    TableFooterColumn
  } from 'material-ui/Table';
import {Card, CardText, CardActions} from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
const moment = require('moment');
  
class TradeListComponent extends Component {
    constructor(props) {
        super(props);
        this.tradeList = [];
        this.state = {
            selected : [0],
            btnDisabled : false
        };
    }

    handleDeleteRowClick(event) {
        let yes = confirm("Do you want to delete this trade - Are you sure?");
        if(yes) this.props.deleteTrade(event.currentTarget.parentNode.dataset.tradeId);
    }

    isSelected = (index) => {
        return this.state.selected.indexOf(index) !== -1;
    };    

    handleRowSelection = (selectedRows) => {
        this.setState({
          selected: selectedRows,
        });
        if(selectedRows.length>0 && this.props.isTradeInEditMode()!==true) {
            let tradeId = this.tradeList[selectedRows[0]].tradeId;
            this.props.setActiveTrade(tradeId, this.props.trades.trades[tradeId]);
        }
    };

    handleNewTradeRequest() {
        this.setState({btnDisabled : true});
        this.props.handleNewTradeRequest();
    }

    filterTrades(trades, queryCriteria) {
        let filteredKeys = Object.keys(trades).filter((key) => {
            let tradeBody = trades[key];
            let tradeDate = moment(tradeBody.tradeDate, "YYYY-MM-DD").toDate();  
            if(queryCriteria.commodity!='ALL' && tradeBody.commodity !== queryCriteria.commodity) return false;
            if(queryCriteria.location!='ALL'&& tradeBody.location !== queryCriteria.location) return false;
            if(queryCriteria.counterparty!='ALL' && tradeBody.counterparty !== queryCriteria.counterparty) return false;
            if(queryCriteria.side!='ALL' && tradeBody.side !== queryCriteria.side) return false;
            if((tradeDate < queryCriteria.dateFrom.toDate()) || (tradeDate > queryCriteria.dateTo.toDate())) 
                    return false;
            return true;
        })
        let filteredTrades = filteredKeys.map((key, index) => ( {...trades[key]} ) );
        return filteredTrades;
    }

    render() {
        let trades = this.filterTrades(this.props.trades.trades, this.props.trades.queryCriteria);
        this.tradeList = trades.map((tradeBody, index) => {
            let tradeDate = moment(tradeBody.tradeDate, "YYYY-MM-DDTHH:mm:ss.SSSZ").format("DD/MM/YYYY");
            tradeBody.tradeDate = tradeDate;

            let commodityRow = this.props.refdata.commodities[tradeBody.commodity];        
            tradeBody.commodity = (commodityRow)
                                        ? commodityRow.description 
                                        : tradeBody.commodity;
            
            let locationRow = this.props.refdata.locations[tradeBody.location];
            tradeBody.location = (locationRow)
                ? locationRow.description 
                : tradeBody.location;

            let cpRow = this.props.refdata.counterparties[tradeBody.counterparty];
            tradeBody.counterparty = (cpRow)
                ? cpRow.description 
                : tradeBody.counterparty;
            return tradeBody;
        }); 
        let tblColHeadStyle = {textAlign:'left', backgroundColor:"#F5F5F5", color:'#000000', fontWeight:'bold'};
        let tblColStyle = {textAlign:'left'};
        return (
            <Card style = {{marginRight:"5px"}}>
                <CardText>
                    <Table ref="tblTradeList" onRowSelection={this.handleRowSelection.bind(this)}>
                        <TableHeader displaySelectAll={false} 
                                    adjustForCheckbox={false}
                                    enableSelectAll={false}>
                        <TableRow>
                            <TableHeaderColumn width="15%" style={tblColHeadStyle}>Trade Date</TableHeaderColumn>
                            <TableHeaderColumn width="15%" style={tblColHeadStyle}>Commodity</TableHeaderColumn>
                            <TableHeaderColumn width="10%" style={tblColHeadStyle}>Side</TableHeaderColumn>
                            <TableHeaderColumn width="10%" style={tblColHeadStyle}>Qty (MT)</TableHeaderColumn>
                            <TableHeaderColumn width="15%" style={tblColHeadStyle}>Price (/MT)</TableHeaderColumn>
                            <TableHeaderColumn width="15%" style={tblColHeadStyle}>Counterparty</TableHeaderColumn>
                            <TableHeaderColumn width="10%" style={tblColHeadStyle}>Location</TableHeaderColumn>
                            <TableHeaderColumn width="10%" style={tblColHeadStyle}>Action</TableHeaderColumn>
                        </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false}
                                    showRowHover={true}>
                            {        
                                this.tradeList.map((trade, index) => (
                                    <TableRow key={trade['tradeId']} selected={this.isSelected(index)}>
                                        <TableRowColumn key={index} width="15%" style={tblColStyle}>{trade['tradeDate']}</TableRowColumn>
                                        <TableRowColumn key={index} width="15%" style={tblColStyle}>{trade['commodity']}</TableRowColumn>
                                        <TableRowColumn key={index} width="10%" style={tblColStyle}>{trade['side']}</TableRowColumn>
                                        <TableRowColumn key={index} width="10%" style={tblColStyle}>{trade['quantity']}</TableRowColumn>
                                        <TableRowColumn key={index} width="15%" style={tblColStyle}>{trade['price']}</TableRowColumn>
                                        <TableRowColumn key={index} width="15%" style={tblColStyle}>{trade['counterparty']}</TableRowColumn>
                                        <TableRowColumn key={index} width="10%" style={tblColStyle}>{trade['location']}</TableRowColumn>
                                        <TableRowColumn key={index} data-trade-id={trade['tradeId']} width="10%" style={tblColStyle}>
                                            <IconButton onClick={this.handleDeleteRowClick.bind(this)}><ActionDelete/></IconButton>
                                        </TableRowColumn>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                        <TableFooter>
                        <TableRow>
                                <TableRowColumn colSpan="6">
                                </TableRowColumn>
                                <TableRowColumn>
                                    <FloatingActionButton ref="btnAddNew" disabled={this.state.btnDisabled} mini={true} secondary={true} 
                                            onClick={this.handleNewTradeRequest.bind(this)}>
                                        <ContentAdd />
                                    </FloatingActionButton>
                                </TableRowColumn>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </CardText>
            </Card>    
        );
    }
}

export default TradeListComponent;