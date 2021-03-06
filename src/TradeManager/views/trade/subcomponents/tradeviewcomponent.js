import React, {Component} from 'react';
import {Card, CardText} from 'material-ui/Card';
const moment = require('moment');

const TradeViewComponent = ({tradeBody, refdata}) => {
    let tradeDate = moment(tradeBody.tradeDate, "YYYY-MM-DDTHH:mm:ss.SSSZ");

    let thisTrade = {...tradeBody};

    thisTrade.commodity = (Object.keys(refdata.commodities).length>0)
        ? refdata.commodities[tradeBody.commodity].description 
        : tradeBody.commodity;

    thisTrade.location = (Object.keys(refdata.locations).length>0)
        ? refdata.locations[tradeBody.location].description 
        : tradeBody.location;
    
    thisTrade.counterparty = (Object.keys(refdata.counterparties).length>0)
        ? refdata.counterparties[tradeBody.counterparty].description 
        : tradeBody.counterparty;
    
    let title = "Trade ID: " + tradeBody.tradeId;
    let contentStyle = {fontSize: "14px"};
    let titleStyle = {fontSize: "12px", color:"#000000", fontWeight: 'bold'};
    let rowStyle = {lineHeight:"3"};
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
                            <td>{thisTrade.commodity}</td>
                        </tr>
                        <tr style={rowStyle}>
                            <td style={colStyle}>Side</td>
                            <td>{thisTrade.side}</td>
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
                            <td>{thisTrade.location}</td>
                        </tr>
                    </tbody>
                </table>
            </CardText>
        </Card>
    );

}

export default TradeViewComponent;