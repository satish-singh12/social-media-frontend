import { POST_TYPES } from "../actions/postActions";

const initialState = {
  post: [],
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_TYPES.CREATE_POST:
      return {
        ...state,
        post: [...state.post, action.payload],
      };
    default:
      return state;
  }
};

export default postReducer;
