import produce from 'immer';

const INITIAL_STATE = {
  profile: null,
};

export default function user(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN_SUCCESS': {
        draft.profile = action.payload;
        break;
      }
      case '@auth/SIGN_OUT': {
        draft.profile = null;
        break;
      }
      case '@user/OPEN_CAMERA': {
        draft.cameraStatus = action.status;
        break;
      }
      case '@user/CLOSE_CAMERA': {
        draft.cameraStatus = action.status;
        break;
      }
      default:
    }
  });
}
