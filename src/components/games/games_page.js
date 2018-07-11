// rcc / rrc para autocompletado
// https://marketplace.visualstudio.com/items?itemName=xabikos.ReactSnippets
import React, { Component } from 'react';
import { connect } from 'react-redux';
import GamesList from './games_list';

function mapStateToProps(state) {
  return {
    games: state.games
  };
}

class GamesPage extends Component {
  render() {
    return (
      <div>
        <GamesList games={this.props.games}/>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
)(GamesPage);