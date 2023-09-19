import { DELETED_VIDEOS, MODAL_VALUE, REMOVE_VIDEO, SAVE_VIDOES } from '../Types';

const initialState = {
  videos_result: [],
  modalvisible: true,
  deletedVideos: []
};
const appReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SAVE_VIDOES:
      return {
        ...state,
        videos_result: [...state.videos_result, payload],
      };

    case DELETED_VIDEOS:
      return {
        ...state,
        deletedVideos: [...state.deletedVideos, payload],
      };

    case MODAL_VALUE:
      return {
        ...state,
        modalvisible: payload,
      };
    case REMOVE_VIDEO:
      const itemIdToRemove = payload;
      const updatedItems = state.videos_result.filter(item => item.video_id !== itemIdToRemove);
      return { ...state, videos_result: updatedItems };

    default:
      return state;
  }
};

export default appReducer;
