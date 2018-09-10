export const SET_GAMES = 'SET_GAMES';
export const SAVE_GAME = 'SAVE_GAME';

export function setGames(games) {
  return {
    type: SET_GAMES,
    games
  };
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
   }).then(handleResponse);
 }
}

export function fetchGames() {
  return dispatch => {
    fetch('/api/games')
      .then(res => res.json())
      .then(data => dispatch(setGames(data.games)));
  }
}