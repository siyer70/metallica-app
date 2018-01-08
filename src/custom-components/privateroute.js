import React, {Component} from 'react';
import { Route } from 'react-router';
import { Redirect } from 'react-router-dom';
import { connect} from 'react-redux'

class PrivateRouteContainer extends Component {
    render() {
        const {
            isAuthenticated,
            component: Comp,
            ...props
        } = this.props
        console.log("Authenticated:", isAuthenticated);
        console.log("User Details:", window.userDetails);
  
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
  
const PrivateRoute = connect(state => ({
    isAuthenticated: state.authReducer.isAuthenticated
}))(PrivateRouteContainer)

export default PrivateRoute;