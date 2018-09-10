import React from 'react';
// rsc para autocompletado de un stateless component
// https://marketplace.visualstudio.com/items?itemName=xabikos.ReactSnippets
const GamesList = ({ games }) => {
  const emptyMessage = (
    <p>There are no games yet in your collection</p>
  );

  const gamesList = (
    <ul>
      {
        games.map( game => (
            <li key={game._id}>{game.title}</li>
          )
        )
      }
    </ul>
  );

  return (
    <div>
      {games.length === 0 ? emptyMessage : gamesList}
    </div>
  );
};

export default GamesList;