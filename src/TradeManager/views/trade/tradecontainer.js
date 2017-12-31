import React, {Component}  from 'react';
import TradeListComponent from './tradelistcomponent';
import TradeComponent from './tradecomponent';

export default class TradeContainer extends Component {
    constructor(props) {
        super(props);
    }

    handleNewTradeRequest() {
        this.refs.tradeComponent.handleNewButtonClick();
    }

    render() {
        let {trades, refdata, activeTrade, createNewTrade, 
            updateTrade, deleteTrade, loadTrades, 
            queryTrades, queryTrade, setActiveTrade} = this.props;
            
        return (
            <table>
                <tbody>
                    <tr>
                        <td width="65%" style={{verticalAlign:'top'}}>
                            <TradeListComponent ref="tradeListComponent"
                                handleNewTradeRequest={this.handleNewTradeRequest.bind(this)} 
                                {...{trades, setActiveTrade, refdata, deleteTrade}} />
                        </td>
                        <td width="35%" height="60%" style={{verticalAlign:'top'}}>
                            <TradeComponent ref="tradeComponent" {...{createNewTrade, updateTrade, 
                                deleteTrade, activeTrade, refdata}}/>
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }

};
