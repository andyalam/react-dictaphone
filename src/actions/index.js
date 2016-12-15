import { guid } from '../snippets/helpers';

export const CREATE_CLIP = 'CREATE_CLIP';
export const DELETE_CLIP = 'DELETE_CLIP';

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
