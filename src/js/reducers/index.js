import { combineReducers } from 'redux';
import player from './player';
import search from './search';

const rootReducer = combineReducers({
  player,
  search
});

export default rootReducer;
