import './App.css';
import React from 'react';
import Signup from './Signup';  
import {Container} from 'react-bootstrap'
import {AuthProvider} from '../context/AuthContext'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Dashboard from './Dashboard'
import Login from './Login'
import PrivateRoute from './PrivateRoute'
import ForgotPassword from './ForgotPassword'
import MainPage from './MainPage'
import UpdateProfile from './UpdateProfile'
import ViewProfile from './ViewProfile';
import TopGames from "./TopGames";
import Search from "./Search";
import Nav from "./Nav";
import GameDetail from "./GameDetail";


function App(){
    document.body.style = 'background: #1761A0;';
    return( 
    <Router>
        <AuthProvider>
                        <Switch>
                <Route exact path="/" component={MainPage} />
                <PrivateRoute exact path="/Dashboard" component={Dashboard} />
                <PrivateRoute path="/update-profile" component={UpdateProfile} />
                <PrivateRoute path="/view-profile" component={ViewProfile} />
                <PrivateRoute exact path='/topgames' component={TopGames} />
                <PrivateRoute exact path='/search' component={Search} />
                <PrivateRoute path='/game/:name' component={GameDetail} />
                <Route path="/signup" component={Signup} />
                <Route path="/login" component={Login} />
                <Route path="/forgot-password" component={ForgotPassword} />
            </Switch>
        </AuthProvider>
        </Router>
       
        
    )
}

export default App;
