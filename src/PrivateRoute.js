import React  from "react";
import {Route, Redirect} from "react-router-dom";
import { useStateValue } from './StateProvider';


// const PrivateRoute = ({ children: children,component: Component, isAuthenticated: isAuthenticated, ...rest }) => {
    
//     const [{authToken},] = useStateValue();
    
//     return (
    
//         <Route {...rest} render={(props) => (
//             authToken.length > 0
//             ? <Component {...props} />
//             : <Redirect to='/signin' />
//         )} />
//     )

// }

const PrivateRoute = ({ children: children,component: Component, ...rest }) => {
    
    const [{user,authToken},] = useStateValue();
    
    return (
    
        <Route {...rest} render={(props) => (
            user.email
            ? <>{children}</>
            : <Redirect to='/signin' />
        )} />
    )

}

export default PrivateRoute;