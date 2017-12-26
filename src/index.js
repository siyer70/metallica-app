import React from 'react';
import {render} from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Provider } from 'react-redux';

import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import appStore from './store';
import TradeManager from './TradeManager/TradeManager'; 
import StatusIndicator from './StatusIndicator/StatusIndicator';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const muiTheme = getMuiTheme(lightBaseTheme);

// Render the main app react component into the app div.
render(
    <Provider store={appStore}>
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
            <StatusIndicator />
            <TradeManager />
        </div> 
      </MuiThemeProvider>
    </Provider>, 
    document.getElementById('app')
);
