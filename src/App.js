import React, { Component } from 'react';
import './App.css';
import { Switch, NavLink, Route } from 'react-router-dom';
import PrivateRoute from './components/common/PrivateRoute';
import LoginPage from './components/Login';
import GamesPage from './components/games/GamesPage';
import GameFormPage from './components/games/GameFormPage';
import auth from './utils/auth';

class App extends Component {
  render() {
    return (
      <div className="ui container">
        <div className="ui three item menu">
          <NavLink className="item" activeClassName="active" exact to="/">Home</NavLink>
          <NavLink className="item" activeClassName="active" exact to="/games">Games</NavLink>
          <NavLink className="item" activeClassName="active" exact to="/games/new">Add New Game</NavLink>
        </div>
        {
          auth.isAuthenticated &&
          <a href="" className="ui primary button right floated column" onClick={() => auth.signout()}>
            Logout
          </a>
        }
        <Switch>
          <Route exact path='/login' component={LoginPage} />
          <Route exact path='/games' component={GamesPage} />
          <PrivateRoute exact path='/games/new' component={GameFormPage} />
          <PrivateRoute exact path='/games/:id/edit' component={GameFormPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
