import React from 'react';
// rsc para autocompletado de un stateless component
// https://marketplace.visualstudio.com/items?itemName=xabikos.ReactSnippets
const GamesList = ({ games }) => {
  const emptyMessage = (
    <p>There are no games yet in your collection</p>
  );

  const gamesList = (
    <p>The Games List</p>
  );

  return (
    <div>
      {games.length === 0 ? emptyMessage : gamesList}
    </div>
  );
};

export default GamesList;