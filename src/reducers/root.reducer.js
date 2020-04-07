import { combineReducers } from 'redux';
import { authReducer } from './auth.reducer';
import { artistReducer } from './artist.reducer';
import { waitingReducer } from './waiting.reducer';
import { gameReducer } from './game.reducer';

const appReducer = combineReducers({
  auth: authReducer,
  artist: artistReducer,
  waiting: waitingReducer,
  game: gameReducer
});

export const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    state = undefined;
  }

  return appReducer(state, action);
};
