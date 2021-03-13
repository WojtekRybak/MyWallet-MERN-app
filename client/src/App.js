import React from 'react';
import {BrowserRouter as Router,Switch, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login'
import CreateUser from './components/CreateUser';
import PrivateRoute from './components/PrivateRoute'

import axios from 'axios';

axios.defaults.withCredentials = true;




function App() {

  return (
      <Router>
        <Switch>
          <Route exact path='/' component={Login}></Route>
          <Route  path='/createuser'>
            <CreateUser/>
          </Route>
          <PrivateRoute exact path='/transactions'> 
            <Navbar/>
          </PrivateRoute>     
        
        </Switch> 
      </Router>
      
  ) 
}



export default App
