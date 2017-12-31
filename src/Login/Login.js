import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import PageHeader from './../common/header';
import StatusIndicator from './../StatusIndicator/StatusIndicator';
import { connect, Provider } from 'react-redux';
import { push } from 'react-router-redux';
import {authSuccess} from './actions';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId : '',
            password : ''
        }
    }

    handleOnChangeUserId(event) {
        this.setState({userId:event.target.value});
    }
    
    handleOnChangePassword(event) {
        this.setState({password:event.target.value});
    }

    render() {
        let contentStyle = {fontSize: "14px"};
        let paperStyle = {fontSize: "14px", height: "250px", paddingTop: "25px", paddingBottom: "25px", paddingRight:"50px", textAlign: 'right'};
        let textStyle = {paddingBottom:"20px"};
        return (
            <div>
                <StatusIndicator />
                <PageHeader />
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
                                        onChange={this.handleOnChangePassword.bind(this)}
                                        hintText="Enter your password"
                                        errorText="This field is required"
                                    />
                                    <br/>
                                    <RaisedButton labelStyle = {contentStyle} label="Login" style={{marginTop :"30px"}} primary={true} onClick={this.props.login}/>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </Paper>
            </div>
        );
    }
    
}

export default connect(state => ({
    isAuthenticated: state.authReducer.isAuthenticated
}), dispatch => ({
    login: () => {
      dispatch(authSuccess());
      dispatch(push('/#/trade'));
    }
}))(Login);