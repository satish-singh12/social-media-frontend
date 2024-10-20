import { NOTIFICATION_TYPES } from "../actions/notificationActions";
import { EditData } from "../actions/alertActions";
const initialState = {
  loading: false,
  data: [],
  sound: false,
};
const notificationReducers = (state = initialState, action) => {
  switch (action.type) {
    case NOTIFICATION_TYPES.GET_NOTIFICATIONS:
      return {
        ...state,
        data: action.payload,
      };
    case NOTIFICATION_TYPES.CREATE_NOTIFICATIONS:
      return {
        ...state,
        data: [action.payload, ...state.data],
      };
    case NOTIFICATION_TYPES.REMOVE_NOTIFICATIONS:
      return {
        ...state,
        data: state.data.filter(
          (item) =>
            item.id !== action.payload.id || item.url !== action.payload.url
        ),
      };
    case NOTIFICATION_TYPES.UPDATE_NOTIFICATIONS:
      return {
        ...state,
        data: EditData(state.data, action.payload._id, action.payload),
      };
    case NOTIFICATION_TYPES.DELETE_NOTIFICATIONS:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

export default notificationReducers;
