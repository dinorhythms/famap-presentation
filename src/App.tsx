import React from 'react';
import './App.css';

// import { LoadScript } from '@react-google-maps/api';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { UserIsAuthenticated, UserIsNotAuthenticated } from './helpers/auth'

import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Nav from './components/navigation/Nav';
import Dashboard from './pages/dashboard/Dashboard';
import Register from './pages/register/Register';
import ProfileUpdate from './pages/profile/ProfileUpdate';
import EmailVerification from './helpers/EmailVerification';
import Locations from './pages/locations/Locations';
import RegisterArtisan from './components/artisan/RegisterArtisan';
import ArtisanProfile from './components/artisan/ArtisanProfile';
import SearchConnnect from './components/search/SearchConnnect';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
      {/* <LoadScript libraries={libraries} id="script-loader" googleMapsApiKey="AIzaSyBK1T5m7v09cMQiqzWU5TSLx7NthD7Uwho"/> */}
        <Nav/>
        <Switch>
          <Route exact path="/" component={UserIsNotAuthenticated(Home)} />
          <Route path="/login" component={UserIsNotAuthenticated(Login)} />
          <Route path="/register" component={UserIsNotAuthenticated(Register)} />
          <Route path="/dashboard" component={UserIsAuthenticated(Dashboard)} />
          <Route path="/profileupdate" component={UserIsAuthenticated(ProfileUpdate)} />
          <Route path="/emailverification" component={UserIsAuthenticated(EmailVerification)} />
          <Route path="/locations" component={UserIsAuthenticated(Locations)} />
          <Route path="/registerartisan" component={UserIsAuthenticated(RegisterArtisan)} />
          <Route path="/artisanprofile" component={UserIsAuthenticated(ArtisanProfile)} />
          <Route path="/searchconnect/:id" component={UserIsAuthenticated(SearchConnnect)} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
