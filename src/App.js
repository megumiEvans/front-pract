import PrivateRoute from './auth';
import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Login from "./pages/Login/Login";
import Singup from "./pages/Login/Singup";
import TransactClients from "./pages/Transactions/TransactClients";
import Dashboard from "./pages/Dashboard/Dashboard";

class App extends Component {
  render(){
    return (
      <div className="App">
        <Router >{/*basename={'/home'}*/}
          <Switch>
              <Route exact path="/" component={Login}/>
              <Route exact path="/registro" component={Singup}/>
              <PrivateRoute path="/inicio" component={Dashboard}/>
              <PrivateRoute path="/movimientos" component={TransactClients}/>
          </Switch>
        </Router>
      </div>
    );
  }  
}

export default App;
