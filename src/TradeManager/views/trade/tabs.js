import React  from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import SearchComponent from './searchcomponent';
import Divider from 'material-ui/Divider';
import TradeListComponent from './tradelistcomponent';
import TradeComponent from './tradecomponent';

const tabStyles = {
    tabHeading: {
      fontSize: 24,
      paddingTop: 16,
      marginBottom: 12,
      fontWeight: 400,
    },
  };


const FeatureTabs = () => (
    <div>
        <Tabs >
            <Tab label="TRADES" style={{backgroundColor:"#F5F5F5", color:"#000000"}}>
                <div>
                    <Divider />
                    <SearchComponent />
                    <table>
                        <tbody>
                            <tr>
                                <td width="65%" style={{verticalAlign:'top'}}>
                                    <TradeListComponent />
                                </td>
                                <td width="35%" height="60%" style={{verticalAlign:'top'}}>
                                    <TradeComponent />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Tab>
            <Tab label="TRANSFERS" style={{backgroundColor:"#F5F5F5", color:"#000000"}}>
                <div>
                    <h2> Tab Two</h2>
                </div>
            </Tab>
            <Tab label="TRANSPORTS" style={{backgroundColor:"#F5F5F5", color:"#000000"}}>
                <div>
                    <h2> Tab Three</h2>
                </div>
            </Tab>
        </Tabs>
    </div>
);

export default FeatureTabs;