import { POST_TYPES } from "../actions/postActions";
import { DeleteData, EditData } from "../actions/alertActions";

const initialState = {
  post: [],
  loading: false,
  results: 0,
  page: 0,
  images: [],
  detailPost: [],
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_TYPES.CREATE_POST:
      return {
        ...state,
        post: [action.payload, ...state.post],
        detailPost: [action.payload, ...state.detailPost], // Update the detailed post list
      };
    case POST_TYPES.LOADING_POST:
      return {
        ...state,
        loading: action.payload,
      };
    case POST_TYPES.IMAGES:
      return {
        ...state,
        images: [...state.images, action.payload],
      };
    case POST_TYPES.GET_POSTS:
      return {
        ...state,
        post: action.payload.posts,
        results: action.payload.result,
      };
    case POST_TYPES.UPDATE_POST:
      return {
        ...state,
        post: EditData(state.post, action.payload._id, action.payload),
      };
    case POST_TYPES.DELETE_POST:
      return {
        ...state,
        post: DeleteData(state.post, action.payload._id),
      };
    case POST_TYPES.GET_POST:
      // Add the post only if it's not already in detailPost
      if (!state.detailPost.some((post) => post._id === action.payload._id)) {
        return {
          ...state,
          detailPost: [action.payload],
        };
      }
      return state;
    default:
      return state;
  }
};

export default postReducer;
