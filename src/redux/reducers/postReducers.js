import { POST_TYPES } from "../actions/postActions";
import { EditData } from "../actions/alertActions";

const initialState = {
  post: [],
  loading: false,
  results: 0,
  page: 0,
  images: [],
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_TYPES.CREATE_POST:
      return {
        ...state,
        post: [action.payload, ...state.post],
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
    case POST_TYPES.GET_POST:
      return {
        ...state,
        post: action.payload.posts,
        results: action.payload.result,
      };
    case POST_TYPES.UPDATE_POST:
      return {
        ...state,
        post: EditData(state.post, action.payload, action.payload.posts),
      };
    default:
      return state;
  }
};

export default postReducer;
