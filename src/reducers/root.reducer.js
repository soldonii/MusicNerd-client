import { combineReducers } from 'redux';
import { authReducer } from './auth.reducer';
import { artistReducer } from './artist.reducer';
import { gameReducer } from './game.reducer';

export default combineReducers({
  auth: authReducer,
  artist: artistReducer,
  game: gameReducer
 });
