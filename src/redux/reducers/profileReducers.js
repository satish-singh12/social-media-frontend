import { PROFILE_TYPES } from "../actions/profileActions";
import { EditData } from "../actions/alertActions";

const initialState = {
  loading: false,
  users: [],
  posts: [],
  ids: [],
  userposts: [],
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

        users: userExists ? state.users : [...state.users, action.payload],
      };
    case PROFILE_TYPES.GET_IDS:
      return {
        ...state,
        ids: [...state.ids, action.payload],
      };
    case PROFILE_TYPES.USER_POSTS:
      return {
        ...state,
        userposts: [...state.userposts, action.payload],
      };
    case PROFILE_TYPES.FRIEND:
      return {
        ...state,
        users: EditData(state.users, action.payload._id, action.payload),
      };
    case PROFILE_TYPES.UNFRIEND:
      return {
        ...state,
        users: EditData(state.users, action.payload._id, action.payload),

        // state.users.map((user) =>
        //   user._id === action.payload._id ? action.payload : user
        // ),
      };
    default:
      return state;
  }
};

export default profileReducers;
