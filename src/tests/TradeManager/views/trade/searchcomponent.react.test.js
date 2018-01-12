import React from 'react';
import SearchComponent from '../../../../TradeManager/views/trade/searchcomponent';
import renderer from 'react-test-renderer';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';




test('Component is able to load and trigger search with default parameters', () => {
    var receivedObject = undefined;

    const queryTrades = (obj) => {
        receivedObject = obj;
    }

    var refdata = {
        commodities : [
            {"AUG" : {code: 'AUG', description: 'Gold'}},
            {"ABG" : {code: 'ABG', description: 'Silver'}},
        ],
        locations : [
            {"LON" : {code: 'LON', description: 'London'}},
            {"NYC" : {code: 'NYC', description: 'New York'}},
        ],
        counterparties : [
            {"ABCL" : {code: 'ABCL', description: 'ABC Inc'}},
            {"INFY" : {code: 'INFY', description: 'Infosys'}},
        ],
    }

    const muiTheme = getMuiTheme(lightBaseTheme);
    
    const component = renderer.create(
        <MuiThemeProvider muiTheme={muiTheme}>
            <SearchComponent  
            key={'somekey'} 
            queryTrades={queryTrades} 
            refdata={refdata} />
        </MuiThemeProvider>
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();


      

});