import { combineReducers } from 'redux';
import ClipsReducer from './reducer_clips';

const rootReducer = combineReducers({
  clips: ClipsReducer
});

export default rootReducer;
