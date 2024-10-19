import {
  getDataApi,
  postDataApi,
  patchDataApi,
  deleteDataApi,
} from "../../utils/fetchDataApi";

export const NOTIFICATION_TYPES = {
  GET_NOTIFICATIONS: "GET_NOTIFICATIONS",
  CREATE_NOTIFICATIONS: "CREATE_NOTIFICATIONS",
  REMOVE_NOTIFICATIONS: "REMOVE_NOTIFICATIONS",
};

export const createNotification =
  ({ msg, auth, socket }) =>
  async (dispatch) => {
    //console.log({msg})
    try {
      const res = await postDataApi("notification", msg, auth.token);
      socket.emit("createNotification", {
        ...res.data.notification,
        user: {
          username: auth.user.username,
          avatar: auth.user.avatar,
        },
      });
    } catch (err) {
      dispatch({
        type: "ALERT",
        payload: { error: "error" },
      });
    }
  };

export const removeNotification =
  ({ msg, auth, socket }) =>
  async (dispatch) => {
    try {
      const res = await deleteDataApi(
        `notification/${msg.id}?url=${msg.url}`,
        auth.token
      );
      socket.emit("removeNotification", msg);
    } catch (err) {
      dispatch({
        type: "ALERT",
        payload: { error: err.response.data.message },
      });
    }
  };

export const getNotification = (auth) => async (dispatch) => {
  try {
    const res = await getDataApi(`notifications`, auth.token);
    dispatch({
      type: NOTIFICATION_TYPES.GET_NOTIFICATIONS,
      payload: res.data.notifications,
    });
    console.log(res);
  } catch (err) {
    dispatch({
      type: "ALERT",
      payload: { error: err.response.data.message },
    });
  }
};
