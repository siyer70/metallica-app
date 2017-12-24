import React, {Component} from 'react';
import {Card, CardText, CardActions} from 'material-ui/Card';

class TickerComponent extends Component {
    constructor() {
        super();
        this.tickers = {};
        this.tickers['AU'] = {code:"AU",name:"Gold",date:"2017-12-21T13:37:08.605Z",unit:"1 oz",currency:"USD",price:1250.17};
        this.tickers['CU'] = {code:"CU",name:"Copper",date:"2017-12-21T13:37:08.605Z",unit:"1 mt",currency:"USD",price:6595.02};
        this.tickers['ZN'] = {code:"ZN",name:"Zinc",date:"2017-12-21T13:37:08.605Z",unit:"1 mt",currency:"USD",price:3092.64};
        this.tickers['AL'] = {code:"AL",name:"Aluminium",date:"2017-12-21T13:37:08.605Z",unit:"1 ",currency:"USD",price:2010.53};
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
                                        <td style={tblColStyle} key={key}>{this.tickers[key].price}</td>
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