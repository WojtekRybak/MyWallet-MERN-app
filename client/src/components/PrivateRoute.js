import React from 'react';
import {Route,Redirect} from 'react-router-dom';
import { useGlobalContext } from '../context/GlobalState';

function PrivateRoute({children, ...rest}) {
    const {user} = useGlobalContext()
    
    return (
        <Route {...rest} render={()=>{  
            return user === 'Logged In' ? children : <Redirect to='/transactions'></Redirect>}}>    
        </Route>
    )
}

export default PrivateRoute  
