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
  UPDATE_NOTIFICATIONS: "UPDATE_NOTIFICATIONS",
  DELETE_NOTIFICATIONS: "DELETE_NOTIFICATIONS",
};

export const createNotification =
  ({ msg, auth, socket }) =>
  async (dispatch) => {
    try {
      // Create the notification via API
      const res = await postDataApi("notification", msg, auth.token);
      // Emit the notification event to the server via socket
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
  } catch (err) {
    dispatch({
      type: "ALERT",
      payload: { error: err.response.data.message },
    });
  }
};

// export const readNotification =
//   ({ dt, auth }) =>
//   async (dispatch) => {
//     dispatch({
//       type: NOTIFICATION_TYPES.UPDATE_NOTIFICATIONS,
//       payload: { ...dt, isRead: true },
//     });
//     try {
//       await patchDataApi(`isreadnotification/${dt._id}`, null, auth.token);
//     } catch (err) {
//       dispatch({
//         type: "ALERT",
//         payload: { error: err.response.data.message },
//       });
//     }
//   };
export const readNotification =
  ({ dt, auth }) =>
  async (dispatch) => {
    // Optimistic UI update
    dispatch({
      type: NOTIFICATION_TYPES.UPDATE_NOTIFICATIONS,
      payload: { ...dt, isRead: true },
    });

    try {
      const res = await patchDataApi(
        `isreadnotification/${dt._id}`,
        null,
        auth.token
      );
    } catch (err) {
      // Rollback the optimistic update if the request fails
      dispatch({
        type: NOTIFICATION_TYPES.UPDATE_NOTIFICATIONS,
        payload: { ...dt, isRead: false }, // Revert the change
      });

      dispatch({
        type: "ALERT",
        payload: { error: err.response?.data?.message || "An error occurred" },
      });
    }
  };

export const deleteNotificationsAll =
  ({ auth, socket }) =>
  async (dispatch) => {
    dispatch({
      type: NOTIFICATION_TYPES.DELETE_NOTIFICATIONS,
      payload: [],
    });
    try {
      const res = await deleteDataApi("deleteallnotification", auth.token);
      socket.emit("deleteAllNotifications"); //added
    } catch (err) {
      const errorMessage = err.response?.data?.message || "An error occurred";
      dispatch({
        type: "ALERT",
        payload: { error: errorMessage },
      });
    }
  };
