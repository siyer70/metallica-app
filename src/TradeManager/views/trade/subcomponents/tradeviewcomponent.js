import React, {Component} from 'react';
import {Card, CardText} from 'material-ui/Card';
const moment = require('moment');

const TradeViewComponent = ({tradeBody}) => {
    let tradeDate = moment(tradeBody.tradeDate, "YYYY-MM-DDTHH:mm:ss.SSSZ");

    let title = "Trade ID: " + tradeBody.tradeId;
    let contentStyle = {fontSize: "14px"};
    let titleStyle = {fontSize: "12px", color:"#000000", fontWeight: 'bold'};
    let rowStyle = {marginBottom:"15px", paddingBottom:"15px"};
    let colStyle = {paddingRight:"15px"};

    return (
        <Card>
            <CardText>
                <table>
                    <tbody style={contentStyle}>
                        <tr style={rowStyle}>
                            <td style={colStyle}>Trade Date</td>
                            <td>{tradeDate.format("DD/MM/YYYY")}</td>
                        </tr>
                        <tr style={rowStyle}>
                            <td style={colStyle}>Commodity</td>
                            <td>{tradeBody.commodity}</td>
                        </tr>
                        <tr style={rowStyle}>
                            <td style={colStyle}>Side</td>
                            <td>{tradeBody.side}</td>
                        </tr>
                        <tr style={rowStyle}>
                            <td style={colStyle}>Counterparty</td>
                            <td>{tradeBody.counterparty}</td>
                        </tr>
                        <tr style={rowStyle}>
                            <td style={colStyle}>Price</td>
                            <td>{tradeBody.price}</td>
                        </tr>
                        <tr style={rowStyle}>
                            <td style={colStyle}>Quantity</td>
                            <td>{tradeBody.quantity}</td>
                        </tr>
                        <tr style={rowStyle}>
                            <td style={colStyle}>Location</td>
                            <td>{tradeBody.location}</td>
                        </tr>
                    </tbody>
                </table>
            </CardText>
        </Card>
    );

}

export default TradeViewComponent;