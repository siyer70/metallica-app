import React, {Component} from 'react';
import { withRouter } from 'react-router'
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';

class UserProfile extends Component {
    constructor(props, context) {
        super(props, context);
    }

    handleTragePageClick() {
        this.props.gotoTradePage();
    }

    render() {
        let {isAuthenticated, userDetails} = this.props;
        let username = (userDetails && userDetails.username)?userDetails.username:"Unknown";
        let contentStyle = {fontSize: "14px"};
        let paperStyle = {fontSize: "14px", height: "400px", paddingTop: "25px", paddingBottom: "25px", paddingRight:"50px", textAlign: 'right'};
        let textStyle = {paddingBottom:"20px"};
        return (
            <div>
                <br/>
                <br/>
                <h2>User Information</h2>
                <hr/>
                <Paper style={paperStyle} zDepth={2}>
                    <table width="75%">
                        <tbody>
                        <tr>
                            <td width="50%" >
                                <img src="/gold2.jpg" alt="" />
                            </td>
                            <td width="50%">
                                    <span style={contentStyle}>{username}</span>
                                    <br/>
                                    <RaisedButton labelStyle = {contentStyle} label="Trade" style={{marginTop :"30px"}} primary={true} onClick={this.handleTragePageClick.bind(this)}/>
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
    ...state.authReducer
}), dispatch => ({
    gotoTradePage: () => {
        dispatch(push('/trade'));
    }
}))(UserProfile));
