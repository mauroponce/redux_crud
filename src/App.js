import React, { Component } from 'react';
import './App.css';
import { NavLink, Route } from 'react-router-dom';
import GamesPage from './components/games/games_page';

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
      </div>
    );
  }
}

export default App;
