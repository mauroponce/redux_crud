export const SET_GAMES = 'SET_GAMES';
export const ADD_GAME = 'ADD_GAME';
export const GAME_FETCHED = 'GAME_FETCHED';
export const GAME_UPDATED = 'GAME_UPDATED';

export function setGames(games) {
  return {
    type: SET_GAMES,
    games
  };
}

export function gameFetched(game) {
  return {
    type: GAME_FETCHED,
    game
  }
}

export function addGame(game) {
  return {
    type: ADD_GAME,
    game
  }
}

export function gameUpdated(game) {
  return {
    type: GAME_UPDATED,
    game
  }
}

function handleResponse(response) {
  if (response.ok) {
    return response.json();
  } else {
    let error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

export function saveGame(game) {
 return dispatch => {
   return fetch('/api/games', {
     method: 'post',
     body: JSON.stringify(game),
     headers: {
       "Content-Type" : 'application/json'
     }
   })
   .then(handleResponse)
   .then(data => dispatch(addGame(data.game)));
 }
}

export function updateGame(game) {
  return dispatch => {
    return fetch(`/api/games/${game._id}/update`, {
      method: 'put',
      body: JSON.stringify(game),
      headers: {
        "Content-Type": 'application/json'
      }
    })
      .then(handleResponse)
      .then(data => dispatch(gameUpdated(data.game)));
  }
}


export function fetchGames() {
  return dispatch => {
    fetch('/api/games')
      .then(res => res.json())
      .then(data => dispatch(setGames(data.games)));
  }
}

export function fetchGame(id) {
  return dispatch => {
    fetch(`/api/games/${id}`)
      .then(res => res.json())
      .then(data => dispatch(gameFetched(data.game)));
  }
}