import React from 'react';
import Signup from './Signup';  
import {AuthProvider} from '../context/AuthContext'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"

import Dashboard from '../Dashboard/Dashboard'
import Login from './Login'
import PrivateRoute from './PrivateRoute'
import ForgotPassword from './ForgotPassword'
import MainPage from './MainPage'
import UpdateProfile from './UpdateProfile'
import ViewProfile from './ViewProfile';
import TopGames from "./TopGames";
import Search from "./Search";
import GameDetail from "./GameDetail";
import Listings from './Listings';
import SingleListing from './SingleListing';
import About from './About';



function App(){
    return( 
    <Router>
        <AuthProvider>
                <Switch>
                <Route exact path="/About" component={About}/>
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
                <PrivateRoute path="/listings" component={Listings}/>
                <PrivateRoute path="/singlelisting/:title" component={SingleListing} />
            </Switch>
        </AuthProvider>
        </Router>
       
        
    )
}

export default App;
