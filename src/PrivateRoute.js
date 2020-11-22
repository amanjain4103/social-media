import React  from "react";
import {Route, Redirect} from "react-router-dom";
import { useStateValue } from './StateProvider';

const PrivateRoute = ({ children: children,component: Component, ...rest }) => {
    
    const [{user},] = useStateValue();
    
    return (
    
        <Route {...rest} render={(props) => (
            user.email
            ? <>{children}</>
            : <Redirect to='/signin' />
        )} />
    )

}

export default PrivateRoute;