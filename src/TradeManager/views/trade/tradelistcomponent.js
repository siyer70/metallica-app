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
  
class TradeListComponent extends Component {
    constructor() {
        super();
        this.tradeList = [];
        this.state = {
            selected : [0]
        };
    }

    handleDeleteRowClick(event) {
        console.log("Trade delete called for ", event.currentTarget.parentNode.dataset.tradeId);
        this.props.deleteTrade(event.currentTarget.parentNode.dataset.tradeId);
    }

    isSelected = (index) => {
        return this.state.selected.indexOf(index) !== -1;
    };    

    handleRowSelection = (selectedRows) => {
        this.setState({
          selected: selectedRows,
        });
        if(selectedRows.length>0) {
            let tradeId = this.tradeList[selectedRows[0]].tradeId;
            console.log(tradeId, this.props.trades[tradeId]);
            this.props.setActiveTrade(tradeId, this.props.trades[tradeId]);
        }
    };

//     handleCellClick(row, col, event) {
//         console.log("Row, col", row, col);
// //      console.log(event.target.parentNode);
//         console.log(event.currentTarget.dataset);
//     }

    render() {
        this.tradeList = Object.keys(this.props.trades).map((key, index) => this.props.trades[key]); 
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
                            <TableHeaderColumn width="25%" style={tblColHeadStyle}>Trade Date</TableHeaderColumn>
                            <TableHeaderColumn width="10%" style={tblColHeadStyle}>Commodity</TableHeaderColumn>
                            <TableHeaderColumn width="10%" style={tblColHeadStyle}>Side</TableHeaderColumn>
                            <TableHeaderColumn width="10%" style={tblColHeadStyle}>Qty (MT)</TableHeaderColumn>
                            <TableHeaderColumn width="15%" style={tblColHeadStyle}>Price (/MT)</TableHeaderColumn>
                            <TableHeaderColumn width="10%" style={tblColHeadStyle}>Counterparty</TableHeaderColumn>
                            <TableHeaderColumn width="10%" style={tblColHeadStyle}>Location</TableHeaderColumn>
                            <TableHeaderColumn width="10%" style={tblColHeadStyle}>Action</TableHeaderColumn>
                        </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false}
                                    showRowHover={true}>
                            {        
                                this.tradeList.map((trade, index) => (
                                    <TableRow key={trade['tradeId']} selected={this.isSelected(index)}>
                                        <TableRowColumn key={index} width="25%" style={tblColStyle}>{trade['tradeDate']}</TableRowColumn>
                                        <TableRowColumn key={index} width="10%" style={tblColStyle}>{trade['commodity']}</TableRowColumn>
                                        <TableRowColumn key={index} width="10%" style={tblColStyle}>{trade['side']}</TableRowColumn>
                                        <TableRowColumn key={index} width="10%" style={tblColStyle}>{trade['quantity']}</TableRowColumn>
                                        <TableRowColumn key={index} width="15%" style={tblColStyle}>{trade['price']}</TableRowColumn>
                                        <TableRowColumn key={index} width="10%" style={tblColStyle}>{trade['counterparty']}</TableRowColumn>
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
                                    <FloatingActionButton mini={true} secondary={true}>
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