import React, { Component } from 'react';
import './App.css';
import { NavLink, Route } from 'react-router-dom';
import GamesPage from './components/games/GamesPage';
import GameFormPage from './components/games/GameFormPage';

class App extends Component {
  render() {
    return (
      <div className="ui container">
        <div className="ui three item menu">
          <NavLink className="item" activeClassName="active" exact to="/">Home</NavLink>
          <NavLink className="item" activeClassName="active" exact to="/games">Games</NavLink>
          <NavLink className="item" activeClassName="active" exact to="/games/new">Add New Game</NavLink>
        </div>
        <Route exact path='/games' component={GamesPage} />
        <Route exact path='/games/new' component={GameFormPage} />
        <Route exact path='/games/:id/edit' component={GameFormPage} />
      </div>
    );
  }
}

export default App;
