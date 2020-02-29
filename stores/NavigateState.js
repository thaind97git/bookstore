export const CHANGE_PATH = 'CHANGE_PATH';

export default {
  currentPath: (state = '', { type, payload }) => {
    if (type === CHANGE_PATH) {
      return payload;
    }
    return state;
  }
};
