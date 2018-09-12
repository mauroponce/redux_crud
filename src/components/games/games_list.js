import React from 'react';
import GameCard from './game_card';
// rsc para autocompletado de un stateless component
// https://marketplace.visualstudio.com/items?itemName=xabikos.ReactSnippets
const GamesList = ({ games }) => {
  const emptyMessage = (
    <p>There are no games yet in your collection</p>
  );

  const gamesList = (
    <div className="ui four cards">
      { games.map(game => <GameCard game={game} key={game._id} />) }
    </div>
  );

  return (
    <div>
      {games.length === 0 ? emptyMessage : gamesList}
    </div>
  );
};

export default GamesList;