import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import AccountCircle from 'material-ui/svg-icons/action/account-circle';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import verticalAlignCenter from 'material-ui/svg-icons/editor/vertical-align-center';

import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import {authFail} from './../Login/actions';

class PageHeader extends Component {
    constructor(properties) {
        super(properties);
        let user = (window.userDetails)?window.userDetails.username:"Unknown";
        this.state = {
            open : false,
            version : "1.0",
            currentUser : user
        };
    }

    handleAppBarIconClick(event) {
        this.setState({open: !this.state.open});
    }

    handlePreferences(event) {
        alert('Feature under construction');
    }

    handleClose(event) {
        this.setState({open: false});
    }

    handleProfile(event) {
        alert('Feature under construction');
    }

    handleLogout(event) {
        // alert('Logging out');
    }
    
    render() {
        let {isAuthenticated} = this.props;
        let title = `Metallica Application Version ${this.state.version} - Environment: ${process.env.NODE_ENV || 'development'}`;
        let containerStyle = {fontSize: "16px"};
        let titleStyle = {fontSize: "16px"};
        let contentStyle = {fontSize: "16px", color:"#ffffff", verticalAlign: "middle"};
        const styles = {
              mediumIcon: {
                width: 36,
                height: 36,
              },
              medium: {
                width: 72,
                height: 72,
              }
            
        };        
        return (
            <div>
                <AppBar
                    title={title}
                    titleStyle={titleStyle}
                    onLeftIconButtonClick={this.handleAppBarIconClick.bind(this)}
                    iconElementRight={
                        (isAuthenticated) ?
                        <span>
                            <span style={contentStyle}>User: {this.state.currentUser}</span>
                            <IconMenu
                                iconButtonElement={
                                    <IconButton iconStyle={styles.mediumIcon}>
                                        <AccountCircle />
                                    </IconButton>
                                }
                                anchorOrigin={{horizontal: 'right', vertical: 'center'}}
                                targetOrigin={{horizontal: 'right', vertical: 'center'}}
                            >
                                <MenuItem onClick={this.handleProfile.bind(this)} primaryText="Profile" />
                                <MenuItem onClick={this.props.logout} primaryText="Sign out" />
                            </IconMenu>                            
                        </span>
                        : <span style={contentStyle}>Not Logged in</span>
                    }
                />
                <Drawer open={this.state.open} docked={false}>
                    <MenuItem onClick={this.handlePreferences.bind(this)}>Preferences</MenuItem>
                    <MenuItem onClick={this.handleClose.bind(this)}>Close</MenuItem>
                </Drawer>
          </div>
              
        );
    }

}

export default connect(state => ({
    isAuthenticated: state.authReducer.isAuthenticated
}), dispatch => ({
    logout: () => {
      dispatch(authFail());
      dispatch(push('/#/login'));
    }
}))(PageHeader);
