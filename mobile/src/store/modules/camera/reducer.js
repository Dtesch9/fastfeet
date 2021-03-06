import produce from 'immer';

const INITIAL_STATE = {
  cameraStatus: false,
};

export default function camera(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@camera/OPEN_CAMERA': {
        draft.cameraStatus = true;
        break;
      }

      case '@camera/CLOSE_CAMERA': {
        draft.cameraStatus = false;
        break;
      }
      default:
    }
  });
}
