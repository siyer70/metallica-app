import React, {Component} from 'react';
import {Card, CardText, CardActions} from 'material-ui/Card';
import EventHandler from './../../eventhandlers/EventHandler';

class TickerComponent extends Component {
    constructor(props) {
        super(props);
        this.tickers = {};
        this.tickers['AU'] = {code:"AU",name:"Gold",date:"2017-12-21T13:37:08.605Z",unit:"1 oz",currency:"USD",price:0};
        this.tickers['CU'] = {code:"CU",name:"Copper",date:"2017-12-21T13:37:08.605Z",unit:"1 mt",currency:"USD",price:0};
        this.tickers['ZN'] = {code:"ZN",name:"Zinc",date:"2017-12-21T13:37:08.605Z",unit:"1 mt",currency:"USD",price:0};
        this.tickers['AL'] = {code:"AL",name:"Aluminium",date:"2017-12-21T13:37:08.605Z",unit:"1 ",currency:"USD",price:0};
     
        this.state = {
            priceInfo: ""
        }
    }

	componentDidMount(){
        this.props.eventHandler.subscribeForMarketDataEvents("ticker",
            this.marketDataEventCallback, this);
    }

    componentWillUnmount() {
        this.props.eventHandler.unsubscribeForMarketDataEvents("ticker");
    }

    marketDataEventCallback(data, source) {
        let marketDataInJSON = JSON.parse(data);
        let np = parseFloat(marketDataInJSON.price);
        source.tickers[marketDataInJSON.code].price = np;
        let priceText = "";
        Object.keys(source.tickers).forEach(key => {
            priceText += (source.tickers[key].name + ":" + source.tickers[key].price + "\t\t");
        });
        source.setState({priceInfo: priceText});
    }

    render() {
        let title = "Market Data";
        let contentStyle = {fontSize: "14px"};     
        return (
            <div style={{borderLeft: "5px solid #FF4081"}}>
                <Card>
                    <CardText style={contentStyle}>
                        <div><marquee direction="left" width="100%"><pre>{this.state.priceInfo}</pre></marquee></div>
                    </CardText>
                </Card>
                
            </div>

        );
    }
}

export default TickerComponent;