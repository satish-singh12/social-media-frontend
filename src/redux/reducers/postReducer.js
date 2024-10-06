import { POST_TYPES } from "../actions/postActions";

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
        post: [...state.post, action.payload],
      };
    case POST_TYPES.LOADING_POST:
      return {
        ...state,
        loading: action.payload,
      };
    case POST_TYPES.GET_POST:
      return {
        ...state,
        post: action.payload.posts,
        results: action.payload.result,
      };
    case POST_TYPES.IMAGES:
      return {
        ...state,
        images: [...state.images, action.payload],
      };
    default:
      return state;
  }
};

export default postReducer;
