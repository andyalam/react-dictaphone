import { CREATE_CLIP } from '../actions/index';

const INITIAL_STATE = [];

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case CREATE_CLIP:
      return [...state, action.audioData];
    default:
      return state;
  }
}
