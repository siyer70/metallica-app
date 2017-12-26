import React from 'react';
import {render} from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Provider } from 'react-redux';

import appStore from './store';
import TradeManager from './TradeManager/TradeManager'; 
import StatusIndicator from './StatusIndicator/StatusIndicator';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// Render the main app react component into the app div.
render(
    <Provider store={appStore}>
        <div>
            <StatusIndicator />
            <TradeManager />
        </div> 
    </Provider>, 
    document.getElementById('app')
);
