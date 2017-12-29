import React, {Component} from 'react';
import PageHeader from './../common/header';
import StatusIndicator from './../StatusIndicator/StatusIndicator';


export default class UserProfile extends Component {

    render() {
        return (
            <div style={styles.container}>
              <StatusIndicator />
              <PageHeader />
            </div>
        );
    }
    
}