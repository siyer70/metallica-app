import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import AccountCircle from 'material-ui/svg-icons/action/account-circle';

export default class PageHeader extends Component {
    constructor(properties) {
        super(properties);
        this.state = {
            version : "1.0",
            currentUser : "schandrasekhar@sapient.com"
        };
    }

    render() {
        let title = `Metallica Application Version ${this.state.version} - Environment: ${process.env.NODE_ENV || 'development'}`;
        let titleStyle = {fontSize: "16px"};
        let contentStyle = {fontSize: "16px", color:"#ffffff"};
        return (
            <AppBar
                title={title}
                titleStyle={titleStyle}
                iconElementRight={<div><span style={contentStyle}>User: {this.state.currentUser}</span><IconButton><AccountCircle /></IconButton></div>}
            />
        );
    }

}
