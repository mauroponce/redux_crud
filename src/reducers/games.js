import {
  SET_GAMES, ADD_GAME,
  GAME_FETCHED, GAME_UPDATED
} from "../actions";

export default function games(state = [], action = {}) {
  switch (action.type) {
    case SET_GAMES:
      return action.games;
    case ADD_GAME:
      return [
        ...state,
        action.game
      ];
    case GAME_FETCHED:
      const gameFound = state.findIndex(item => item._id === action.game._id) > -1;
      if (gameFound) { // Update existing game in store
        return state.map(item => {
          if(item._id === action.game._id) return action.game;
          return item;
        });
      } else { // just add to the bottom of collection like in ADD_GAME
        return [
          ...state,
          action.game
        ];
      }
    case GAME_UPDATED:
      // Update in redux store, replacing found game or returning the same game
      // in the portion of state that has the games (called state)
      return state.map(item => {
        if (item._id === action.game._id) return action.game;
        return item;
      });
    default:
      return state;
  }
}