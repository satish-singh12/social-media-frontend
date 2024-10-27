import {
  patchDataApi,
  postDataApi,
  deleteDataApi,
  getDataApi,
} from "../../utils/fetchDataApi";
import { POST_TYPES } from "./postActions";
import { EditData, DeleteData } from "./alertActions";
// import { createNotify, removeNotify } from "./notifyActions";

export const MESS_TYPE = {
  ADD_USER: "ADD_USER",
  ADD_MESSAGE: "ADD_MESSAGE",
  GET_CONVERSATION: "GET_CONVERSATION",
  GET_MESSAGE: "GET_MESSAGE",
  DELETE_MESSAGE: "DELETE_MESSAGE",
  UPDATE_ONLINE_USERS: "UPDATE_ONLINE_USERS",
};

export const updateOnlineUsers = (onlineUsers) => {
  return {
    type: MESS_TYPE.UPDATE_ONLINE_USERS,
    payload: onlineUsers,
  };
};

export const AddUser =
  ({ user, message }) =>
  async (dispatch) => {
    if (message.users.every((item) => item._id !== user._id)) {
      dispatch({ type: MESS_TYPE.ADD_USER, payload: user });
    }
  };

export const addMessage =
  ({ auth, msg, socket }) =>
  async (dispatch) => {
    dispatch({ type: MESS_TYPE.ADD_MESSAGE, payload: msg });
    socket.emit("addMessage", msg);
    try {
      await postDataApi("message", msg, auth.token);
    } catch (err) {
      dispatch({
        type: "ALERT",
        payload: {
          error: "there is a error",
        },
      });
    }
  };

export const getConversations = (auth) => async (dispatch) => {
  try {
    const res = await getDataApi("conversations", auth.token);
    let newArr = [];
    res.data.conversation.forEach((item) => {
      item.recipients.forEach((cv) => {
        if (cv._id !== auth.user._id) {
          newArr.push({ ...cv, text: item.text, media: item.media });
        }
      });
    });
    dispatch({
      type: MESS_TYPE.GET_CONVERSATION,
      payload: { newArr, result: res.data.result },
    });
  } catch (err) {
    dispatch({
      type: "ALERT",
      payload: {
        error: "there is a error",
      },
    });
  }
};

export const getMessages =
  ({ auth, id }) =>
  async (dispatch) => {
    try {
      const res = await getDataApi(`message/${id}`, auth.token);
      dispatch({ type: MESS_TYPE.GET_MESSAGE, payload: res.data });
    } catch (err) {
      dispatch({
        type: "ALERT",
        payload: {
          error: "there is a error",
        },
      });
    }
  };

// export const deleteMessage =
//   ({ message, data, auth }) =>
//   async (dispatch) => {
//     const newData = DeleteData(message.data, data._id);
//     dispatch({
//       type: MESS_TYPE.DELETE_MESSAGE,
//       payload: { newData, _id: data.recipient },
//     });
//     try {
//       await deleteDataApi(`message/${data._id}`, auth.token);
//     } catch (err) {
//       dispatch({
//         type: "ALERT",
//         payload: {
//           error: "there is a error",
//         },
//       });
//     }
//   };

export const deleteMessage =
  ({ message, data, auth, socket }) =>
  async (dispatch) => {
    // Filter out the message directly from the Redux state
    dispatch({
      type: MESS_TYPE.DELETE_MESSAGE,
      payload: { messageId: data._id, _id: data.recipient }, // Send only necessary IDs
    });
    socket.emit("getMessage", data);
    try {
      // Call API to delete message on backend
      await deleteDataApi(`message/${data._id}`, auth.token);
    } catch (err) {
      dispatch({
        type: "ALERT",
        payload: { error: "There was an error deleting the message." },
      });
    }
  };

export const deleteAllMessages =
  ({ id, auth, socket }) =>
  async (dispatch) => {
    dispatch({
      type: MESS_TYPE.DELETE_MESSAGE,
      payload: { id }, // Send the userId to delete all messages
    });
    socket.emit("deleteAllMessages", { id });

    try {
      await deleteDataApi(`messages/${id}`, auth.token); // Ensure your backend API supports bulk deletion
    } catch (err) {
      dispatch({
        type: "ALERT",
        payload: { error: "There was an error deleting the messages." },
      });
    }
  };
