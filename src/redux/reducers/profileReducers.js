import { PROFILE_TYPES } from "../actions/profileActions";

const initialState = {
  loading: false,
  users: [],
  posts: [],
};

const profileReducers = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_TYPES.LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case PROFILE_TYPES.GET_USER:
      const userExists = state.users.some(
        (user) => user._id === action.payload.user._id
      );
      return {
        ...state,

        users: userExists ? state.users : [...state.users, action.payload.user],
      };
    default:
      return state;
  }
};

export default profileReducers;
