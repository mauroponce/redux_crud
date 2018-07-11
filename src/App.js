import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Link, Route } from 'react-router-dom';
import GamesList from './components/games/games_page';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          <Link to="games">Games</Link>
        </p>

        <Route exact path='/games' component={GamesList} />
      </div>
    );
  }
}

export default App;
