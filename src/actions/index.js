export const CREATE_CLIP = 'CREATE_CLIP';

export function createClip(audioData) {
  return {
    type: CREATE_CLIP,
    audioData
  }
}
