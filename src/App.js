import PrivateRoute from './auth';
import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Selector from "./components/Selector";
import Login from "./pages/Login/Login";
import Logout from "./pages/Logout/logout";
import Singup from "./pages/Login/Singup";
import TransactClients from "./pages/Transactions/TransactClients";
import AdminTransactions from "./pages/Transactions/AdminTransactions";
import Dashboard from "./pages/Dashboard/Dashboard";
import Users from "./pages/Users/Users";
import UsersMov from "./pages/Users/UserMov";
import Currency from "./pages/CurrencyExch/Currency";
class App extends Component {
  render(){
    return (
      <div className="App">
        <Router >{/*basename={'/home'}*/}
          <Selector/>
          <Switch>
              <Route exact path="/" component={Login}/>
              <Route exact path="/registro" component={Singup}/>
              <PrivateRoute path="/inicio" component={Dashboard}/>
              {/*<PrivateRoute path="/movimientos" component={TransactClients}/>*/}
              <PrivateRoute path="/adminmov" component={AdminTransactions}/>
              <PrivateRoute path="/users" component={Users}/>
              <PrivateRoute path="/usersMov" component={UsersMov}/>
              <PrivateRoute path="/divisas" component={Currency}/>
              <Route exact path="/logout" component={Logout}/>
          </Switch>
        </Router>
      </div>
    );
  }  
}

export default App;
