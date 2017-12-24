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
        this.tradeList.push({
            "_id": "5a2e317babb4a551ec7e52d4",
            "tradeId": 234,
            "commodity": "AL",
            "side": "Buy",
            "price": 800,
            "quantity": 150,
            "counterparty": "AAPL",
            "location": "NYC",
            "status": "OPEN",
            "__v": 0,
            "tradeDate": "2017-12-10T10:45:15.500Z"
        });

        this.tradeList.push(
            {
                "_id": "5a2e8453cd62cf3748f69b61",
                "tradeId": 235,
                "commodity": "AL",
                "side": "Buy",
                "price": 800,
                "quantity": 150,
                "counterparty": "AAPL",
                "location": "NYC",
                "status": "OPEN",
                "__v": 0,
                "tradeDate": "2017-12-10T10:45:15.500Z"
            }
        );
    }

    onRowDelete(event) {
        console.log(event);
    }

    render() {
        let tblColHeadStyle = {textAlign:'left', backgroundColor:"#F5F5F5", color:'#000000', fontWeight:'bold'};
        let tblColStyle = {textAlign:'left'};
        return (
            <Card style = {{marginRight:"5px"}}>
                <CardText>
                    <Table ref="tblTradeList">
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
                                    <TableRow key={trade['tradeId']}>
                                        <TableRowColumn width="25%" style={tblColStyle}>{trade['tradeDate']}</TableRowColumn>
                                        <TableRowColumn width="10%" style={tblColStyle}>{trade['commodity']}</TableRowColumn>
                                        <TableRowColumn width="10%" style={tblColStyle}>{trade['side']}</TableRowColumn>
                                        <TableRowColumn width="10%" style={tblColStyle}>{trade['quantity']}</TableRowColumn>
                                        <TableRowColumn width="15%" style={tblColStyle}>{trade['price']}</TableRowColumn>
                                        <TableRowColumn width="10%" style={tblColStyle}>{trade['counterparty']}</TableRowColumn>
                                        <TableRowColumn width="10%" style={tblColStyle}>{trade['location']}</TableRowColumn>
                                        <TableRowColumn width="10%" style={tblColStyle}>
                                            <IconButton key={trade['tradeId']} onClick={this.onRowDelete}><ActionDelete key={trade['tradeId']} onClick={this.onRowDelete}/></IconButton>
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