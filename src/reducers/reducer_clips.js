import { CREATE_CLIP, DELETE_CLIP } from '../actions/index';

const INITIAL_STATE = [];

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case CREATE_CLIP:
      const clip = {
        blob: action.blob,
        id: action.id,
        clipName: action.clipName
      }
      return [...state, clip ];
    case DELETE_CLIP:
      return state.filter((clip) => clip.id != action.id);
    default:
      return state;
  }
}
