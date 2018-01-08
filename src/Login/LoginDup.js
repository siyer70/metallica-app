import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';

import PageHeader from './../common/header';
import StatusIndicator from './../StatusIndicator/StatusIndicator';
import { connect, Provider } from 'react-redux';
import { push } from 'react-router-redux';
import {authSuccess} from './actions';
import obtainTokenAndUserDetails from './actions/obtainTokenAndUserDetails';

class Login extends Component {
    constructor(props) {
        super(props);
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

    handleLoginClick(event) {
        obtainTokenAndUserDetails(this.state.userId, this.state.password, this, 
            (err, userDetails, source) => {
                if(!err) {
                    alert(JSON.stringify(userDetails));
                    // whatever you want to do with userdetails
                    source.props.login();
                }
        });

        // var hdr = {
        //     'content-type' : 'application/x-www-form-urlencoded',
        //     'Authorization' : 'Basic ' + base64EndcodedId
        // };
        // console.log(hdr); 

        // var details = {
        //     'userName': 'test@gmail.com',
        //     'password': 'Password!',
        //     'grant_type': 'password'
        // };
        
        // var formBody = [];
        // for (var property in formData) {
        //   var encodedKey = encodeURIComponent(property);
        //   var encodedValue = encodeURIComponent(formData[property]);
        //   formBody.push(encodedKey + "=" + encodedValue);
        // }
        // formBody = formBody.join("&");
        // console.log(formBody);
        // let data = '';
        // fetch(url, {
        //   method: 'POST',
        //   headers: {
        //     'Accept': 'application/json',
        //     'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        //     'Authorization' : 'Basic ' + base64EndcodedId
        //   },
        //   body: formBody
        // })        
        // .then(response => {
        //     console.log(response);
        //     response.body.on('data', (chunk) => {
        //         data += chunk;
        //     });
        //     response.body.on('end', )
        //     alert(response.body.toString());
        //     alert(response.status);
        // })
        // .catch((err) => alert("An error occurred while logging in: ", err));

    }

    // handleFBClick(event) {
    //     fetch("/login", { credentials: 'same-origin' })
    //     .then(response => {
    //         console.log("routine called");
    //         console.log(response);
    //         this.props.login();
    //     })
    //     .catch(err => {
    //         console.log(err);
    //         alert("An internal error occurred while logging in:", err);
    //     });
    // }

    render() {
        let contentStyle = {fontSize: "14px"};
        let paperStyle = {fontSize: "14px", height: "400px", paddingTop: "25px", paddingBottom: "25px", paddingRight:"50px", textAlign: 'right'};
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

export default connect(state => ({
    isAuthenticated: state.authReducer.isAuthenticated
}), dispatch => ({
    login: () => {
      dispatch(authSuccess());
      dispatch(push('/#/trade'));
    }
}))(Login);