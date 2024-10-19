import { ALERT_TYPES } from "../actions/alertActions";

const socketReducers = (state = [], action) => {
  switch (action.type) {
    case ALERT_TYPES.SOCKET:
      return action.payload;
    default:
      return state;
  }
};

export default socketReducers;
