import React, {Component} from 'react';
import { withRouter } from 'react-router'
import { Route } from 'react-router-dom'

import { connect } from 'react-redux';
import {authSuccess, authFail} from './Login/actions';

import PageHeader from './common/pageheader';
import StatusIndicator from './StatusIndicator/StatusIndicator';
import PrivateRoute from './custom-components/privateroute';
import Login from './Login/Login'; 
import TradeManager from './TradeManager/TradeManager'; 
import UserProfile from './UserProfile/UserProfile';

class MainApp extends Component {
    constructor(props) {
        super(props);
    }

	componentWillMount(){
        let userDetailsInStr = localStorage.getItem("userDetails");
        console.log("Stored user details from MainApp: ", userDetailsInStr);
        if(userDetailsInStr!=="undefined") {
            let userDetails = JSON.parse(userDetailsInStr);
            this.props.autoLogin(userDetails);
        } else {
            this.props.sendNotLogggedInMessage();
        }
    }

    // getChildContext() {
    //     return {cookiejar: this.cookiejar}
    // }    

    render() {
        let {isAuthenticated, userDetails} = this.props;
        return (
            <div className="base">
                <header>
                    <StatusIndicator />
                    <PageHeader />
                </header>
                <main>
                    <PrivateRoute exact path="/" component={TradeManager}/>
                    <PrivateRoute path="/trade" component={TradeManager}/>
                    <Route path="/signin" component={Login}/>
                    <PrivateRoute path="/profile" component={UserProfile}/>
                </main>
                <footer>
                    <p style={{fontSize: "12px"}}>Copyright &copy; 2018 XYZ Inc.</p>
                </footer>
            </div>
        );
    }
}  

// BaseLayout.childContextTypes = {
//     cookiejar: React.PropTypes.object
// }

export default withRouter(connect(null, dispatch => ({
    autoLogin: (userDetails) => {
        dispatch(authSuccess(userDetails));
    },
    sendNotLogggedInMessage: () => {
        dispatch(authFail());
    }
}))(MainApp));