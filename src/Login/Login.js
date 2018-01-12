import React, {Component} from 'react';
import { withRouter } from 'react-router'
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';

import PageHeader from './../common/pageheader';
import StatusIndicator from './../StatusIndicator/StatusIndicator';
import { connect, Provider } from 'react-redux';
import { push } from 'react-router-redux';
import {authSuccess} from './actions';
import obtainTokenAndUserDetails from './actions/obtainTokenAndUserDetails';
import myprocess from './../common/config';

class Login extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            userId : 'siyer70@gmail.com',
            password : 'metallica'
        }
    }

    handleOnChangeUserId(event) {
        this.setState({userId:event.target.value});
    }
    
    handleOnChangePassword(event) {
        this.setState({password:event.target.value});
    }

    postObtainingUserDetailsCallBack(err, userDetails, source) {
        if(!err) {
            let apiGatewayServiceUrl = myprocess.env.API_GATEWAY_URL;
            localStorage.setItem("userDetails", JSON.stringify(userDetails));
            this.props.login(userDetails);
        }
    }
    

    handleLoginClick(event) {
        obtainTokenAndUserDetails(this.state.userId, this.state.password, this,
            this.postObtainingUserDetailsCallBack.bind(this)); 
    }

    render() {
        let contentStyle = {fontSize: "14px"};
        let paperStyle = {fontSize: "14px", height: "400px", paddingTop: "25px", paddingBottom: "25px", paddingRight:"50px", textAlign: 'right'};
        let textStyle = {paddingBottom:"20px"};
        return (
            <div>
                <br/>
                <br/>
                <h2>Metallica Login</h2>
                <hr/>
                <Paper style={paperStyle} zDepth={2}>
                    <table width="75%">
                        <tbody>
                        <tr>
                            <td width="50%" >
                                <img src="/gold2.jpg" alt="" />
                            </td>
                            <td width="50%">
                                    <TextField
                                        ref="txtUserId"
                                        value = {this.state.userId}
                                        onChange={this.handleOnChangeUserId.bind(this)}
                                        hintText="Enter your email"
                                        errorText="This field is required"
                                    />
                                    <br/>
                                    <TextField
                                        ref="txtPassword"
                                        value = {this.state.password}
                                        type="password"
                                        onChange={this.handleOnChangePassword.bind(this)}
                                        hintText="Enter your password"
                                        errorText="This field is required"
                                    />
                                    <br/>
                                    <RaisedButton labelStyle = {contentStyle} label="Login" style={{marginTop :"30px"}} primary={true} onClick={this.handleLoginClick.bind(this)}/>
                                    <br/>
                                    {/* <p><span>Or</span></p>
                                    <img style={{cursor: "pointer"}} alt="" src="facebook-login-blue-50.jpg" onClick={this.handleFBClick.bind(this)}/> */}
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </Paper>
            </div>
        );
    }
    
}

export default withRouter(connect(state => ({
    isAuthenticated: state.authReducer.isAuthenticated
}), dispatch => ({
    login: (userDetails) => {
        dispatch(authSuccess(userDetails));
        dispatch(push('/trade'));
    }
}))(Login));