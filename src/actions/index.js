import { guid } from '../snippets/helpers';

export const CREATE_CLIP = 'CREATE_CLIP';
export const DELETE_CLIP = 'DELETE_CLIP';
export const UPDATE_CLIP_NAME = 'UPDATE_CLIP_NAME';

export function createClip(blob, clipName) {
  return {
    type: CREATE_CLIP,
    id: guid(),
    clipName,
    blob
  }
}

export function deleteClip(id) {
  return {
    type: DELETE_CLIP,
    id
  }
}

export function updateClipName(id, newName) {
  return {
    type: UPDATE_CLIP_NAME,
    id,
    newName
  }
}
