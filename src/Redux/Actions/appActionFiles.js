import { DELETED_VIDEOS, MODAL_VALUE, REMOVE_VIDEO, SAVE_VIDOES } from '../Types';

export const setInstaVideos = payload => dispatch => {
  dispatch({ type: SAVE_VIDOES, payload });
};
export const setInstaVideoRemove = payload => dispatch => {
  dispatch({ type: REMOVE_VIDEO, payload });
};
export const setModalValue = payload => dispatch => {
  dispatch({ type: MODAL_VALUE, payload });
};
export const setDeltedvideos = payload => dispatch => {
  dispatch({ type: DELETED_VIDEOS, payload });
};

