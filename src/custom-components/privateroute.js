import React, {Component} from 'react';
import { Route } from 'react-router';
import { Redirect } from 'react-router-dom';
import { connect} from 'react-redux'
import { withRouter } from 'react-router'

class PrivateRouteContainer extends Component {
    componentDidMount(){
        console.log("User cookie is: ", document.usercookie);
        // if(document.usercookie!==undefined) {
        //     let details = document.usercookie.split(';');
        //     let isAuthenticated = details[0].split('=')[1]==='true';
        //     console.log("User Authenticated => ", isAuthenticated)
        //     if(isAuthenticated===true) {
        //     }

        // }

    }

    render() {
        const {
            isAuthenticated,
            component: Comp,
            ...props
        } = this.props
  
        return (
            <Route
                {...props}
                render={props =>
                isAuthenticated
                    ? <Comp {...props} />
                    : (
                    <Redirect to={{
                    pathname: '/signin',
                    state: { from: props.location }
                    }} />
                )
                }
            />
        )
    }
}
  
const PrivateRoute = withRouter(connect(state => ({
    isAuthenticated: state.authReducer.isAuthenticated
}))(PrivateRouteContainer));

export default PrivateRoute;