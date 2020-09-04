import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import PrivateRoute from './auth';
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";

const  Routes = props => (
    <Router >{/*basename={'/home'}*/}
        <Switch>
            <Route exact path="/" render={(props) => <Login {...props}/>}/>
            <PrivateRoute path="/inicio" component={Dashboard}/>
        </Switch>
    </Router>
);

export default Routes;