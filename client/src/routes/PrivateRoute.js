import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogin } from '../utils';

/**
 * Private Page Route for protecting
 * @param Component
 * @param rest
 * @returns {JSX.Element}
 * @constructor
 */
const PrivateRoute = ({component: Component, ...rest}) => {
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            isLogin() ?
                <Component {...props} />
                : <Redirect to="/home" />
        )} />
    );
};

export default PrivateRoute;