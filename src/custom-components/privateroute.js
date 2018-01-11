import React, {Component} from 'react';
import { Route } from 'react-router';
import { Redirect } from 'react-router-dom';
import { connect} from 'react-redux'
import { withRouter } from 'react-router'

class PrivateRouteContainer extends Component {
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