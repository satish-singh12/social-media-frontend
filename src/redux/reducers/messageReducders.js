import { MESSAGE_TYPE } from "../actions/messageActions";
import { DeleteData, EditData } from "../actions/alertActions";

const initialState = {
  users: [],
  data: [],
  loading: false,
  resultUsers: 0,
  page: 0,
  firstLoad: false,
};

const messageReducers = (state = initialState, action) => {
  switch (action.type) {
    case MESSAGE_TYPE.ADD_USER:
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    default:
      return state;
  }
};

export default messageReducers;
