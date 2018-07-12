// rcc / rrc para autocompletado
// https://marketplace.visualstudio.com/items?itemName=xabikos.ReactSnippets
import React, { Component } from 'react';
import { connect } from 'react-redux';
import GamesList from './games_list';
import { fetchGames } from '../../actions';

class GamesPage extends Component {
  componentDidMount() {
    this.props.fetchGames();
  }
  render() {
    return (
      <div>
        <GamesList games={this.props.games}/>
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
  { fetchGames }
)(GamesPage);