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
        this.props.eventHandler.subscribeForMarketDataEvents(
            this.marketDataEventCallback, this);
    }

    componentWillUnmount() {
        this.props.eventHandler.unsubscribeForMarketDataEvents();
    }

    marketDataEventCallback(data, source) {
        let marketDataInJSON = JSON.parse(data);
        let cp = parseFloat(source.refs[marketDataInJSON.code].innerHTML);
        let np = parseFloat(marketDataInJSON.price);
        let forecolor = (np>=cp)?"#008000":"#ff0000";
        source.refs[marketDataInJSON.code].innerHTML = marketDataInJSON.price;
        source.refs[marketDataInJSON.code].style.color = forecolor;
        let priceText = "";
        Object.keys(source.tickers).forEach(key => {
            priceText += (source.tickers[key].name + ":" + source.refs[key].innerHTML + "\t\t");
        });
        source.setState({priceInfo: priceText});
    }

    render() {
        let title = "Market Data";
        let contentStyle = {fontSize: "12px"};     
        let titleStyle = {fontSize: "14px", color:"#000000", fontWeight: 'bold'};
        let tblColHeadStyle = {textAlign:'center', paddingLeft:"15px", paddingRight: "15px",  backgroundColor:"#F5F5F5", color:'#000000', fontWeight:'bold'};
        let tblColStyle = {textAlign:'center', paddingLeft:"15px", paddingRight: "15px"};
        let tblRowStyle = {marginBottom:'20px'};

        return (
            <div>
                <Card>
                    <CardText>
                        <div><marquee direction="left" width="100%"><pre>{this.state.priceInfo}</pre></marquee></div>
                        <table width="100%">
                            <tbody style={contentStyle}>
                                <tr style={tblRowStyle}>
                                {
                                    Object.keys(this.tickers).map((key, index) => (
                                        <th style={tblColHeadStyle} key={key}>{this.tickers[key].name}</th>
                                    ))
                                }
                                </tr>

                                <tr style={tblRowStyle}>
                                {
                                    Object.keys(this.tickers).map((key, index) => (
                                        <td style={tblColStyle} key={key}><label ref={key}>{this.tickers[key].price}</label></td>
                                    ))
                                }
                                </tr>
                            </tbody>
                        </table>
                    </CardText>
                </Card>
                
            </div>

        );
    }
}

export default TickerComponent;