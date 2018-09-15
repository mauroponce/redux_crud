// rcc / rrc para autocompletado
// https://marketplace.visualstudio.com/items?itemName=xabikos.ReactSnippets
import React, { Component } from 'react';
import { connect } from 'react-redux';
import GamesList from './GamesList';
import { fetchGames, deleteGame } from '../../actions';

class GamesPage extends Component {
  componentDidMount() {
    this.props.fetchGames();
  }
  render() {
    return (
      <div>
        <GamesList games={this.props.games} deleteGame={this.props.deleteGame} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    games: state.games
  };
}

export default connect(
  mapStateToProps,
  { fetchGames, deleteGame }
)(GamesPage);