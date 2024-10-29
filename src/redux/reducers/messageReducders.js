import { MESS_TYPE } from "../actions/messageActions";
// import { DeleteData, EditData } from "../actions/alertActions";

const initialState = {
  users: [],
  data: [],
  loading: false,
  resultUsers: 0,
  resultData: 0,
  page: 0,
  firstLoad: false,
  onlineUsers: [],
};

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_ONLINE_USERS":
      return {
        ...state,
        onlineUsers: action.payload,
      };
    case MESS_TYPE.ADD_USER:
      // Avoid adding duplicate users
      return {
        ...state,
        users: state.users.some((user) => user._id === action.payload._id)
          ? state.users
          : [...state.users, action.payload],
      };

    case MESS_TYPE.ADD_MESSAGE:
      return {
        ...state,
        data: [...state.data, action.payload],
        users: state.users.map((user) =>
          user._id === action.payload.recipient ||
          user._id === action.payload.sender
            ? {
                ...user,
                text: action.payload.text, // Update last message preview
                media: action.payload.media, // Update any attached media
              }
            : user
        ),
      };

    case MESS_TYPE.GET_CONVERSATION:
      return {
        ...state,
        users: action.payload.newArr, // List of users in conversations
        resultUsers: action.payload.result,
        firstLoad: true,
      };

    case MESS_TYPE.GET_MESSAGE:
      return {
        ...state,
        data: action.payload.message || [],
        resultData: action.payload.result || 0,
      };

    case MESS_TYPE.DELETE_MESSAGE:
      if (action.payload.messageId) {
        return {
          ...state,
          data: state.data.map((conversation) =>
            conversation._id === action.payload._id
              ? {
                  ...conversation,
                  messages: conversation.messages.filter(
                    (msg) => msg._id !== action.payload.messageId
                  ),
                }
              : conversation
          ),
        };
      } else if (action.payload.userId) {
        // Delete all messages with the user
        return {
          ...state,
          data: state.data.filter(
            (msg) => msg.recipient !== action.payload.userId
          ),
        };
      }
      return state;
    default:
      return state;
  }
};

export default messageReducer;
