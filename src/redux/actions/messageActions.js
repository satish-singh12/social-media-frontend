import {
  postDataApi,
  deleteDataApi,
  getDataApi,
} from "../../utils/fetchDataApi";

export const MESS_TYPE = {
  ADD_USER: "ADD_USER",
  ADD_MESSAGE: "ADD_MESSAGE",
  GET_CONVERSATION: "GET_CONVERSATION",
  GET_MESSAGE: "GET_MESSAGE",
  DELETE_MESSAGE: "DELETE_MESSAGE",
  DELETE_ALL_MESSAGES: "DELETE_ALL_MESSAGES",
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

      dispatch(getMessages({ auth, id: msg.recipient }));
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

export const deleteMessage =
  ({ message, data, auth, socket }) =>
  async (dispatch) => {
    try {
      if (!data || !data._id) {
        throw new Error("Message ID is missing.");
      }

      // Dispatch delete action
      dispatch({
        type: MESS_TYPE.DELETE_MESSAGE,
        payload: { messageId: data._id, _id: data.recipient },
      });
      socket.emit("getMessage", data);
      // Delete message from API, with media check
      if (data.media && data.media.length > 0) {
        const mediaUrls = data.media.map((file) => file.secure_url);
        await deleteDataApi(`message/${data._id}`, auth.token, {
          media: mediaUrls,
        });
      } else {
        await deleteDataApi(`message/${data._id}`, auth.token);
      }

      socket.emit("messageDeleted", data._id);
    } catch (err) {
      dispatch({
        type: "ALERT",
        payload: { error: "There was an error deleting the message." },
      });
      console.error("Delete message error:", err);
    }
  };

export const deleteAllMessages =
  ({ id, auth, socket }) =>
  async (dispatch) => {
    dispatch({
      type: MESS_TYPE.DELETE_ALL_MESSAGES,
      payload: { id },
    });
    socket.emit("deleteAllMessages", { id });

    try {
      await deleteDataApi(`messages/${id}`, auth.token);
      dispatch(getMessages({ auth, id }));
    } catch (err) {
      dispatch({
        type: "ALERT",
        payload: { error: "There was an error deleting the messages." },
      });
    }
  };
