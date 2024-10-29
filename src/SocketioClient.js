import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { POST_TYPES } from "./redux/actions/postActions";
import { NOTIFICATION_TYPES } from "./redux/actions/notificationActions";
import { MESS_TYPE, updateOnlineUsers } from "./redux/actions/messageActions";
import notify from "./assets/notification.mp3";

const SocketioClient = () => {
  const auth = useSelector((state) => state.auth);
  const socket = useSelector((state) => state.socket);
  const dispatch = useDispatch();
  const [userInteracted, setUserInteracted] = useState(false);

  // One-time event listener for user interaction
  useEffect(() => {
    const handleUserInteraction = () => {
      setUserInteracted(true);
      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("keydown", handleUserInteraction);
    };

    document.addEventListener("click", handleUserInteraction);
    document.addEventListener("keydown", handleUserInteraction);

    return () => {
      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("keydown", handleUserInteraction);
    };
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.emit("joinUser", auth.user._id);

    // Listen for the online users list from the server
    socket.on("getOnlineUsers", (onlineUsers) => {
      dispatch(updateOnlineUsers(onlineUsers));
    });

    return () => {
      socket.off("getOnlineUsers");
    };
  }, [socket, auth.user._id, dispatch]);

  useEffect(() => {
    if (socket) {
      socket.on("likePostToClient", (newPost) => {
        dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
      });
    }
    return () => socket && socket.off("likePostToClient");
  }, [socket, dispatch]);

  useEffect(() => {
    if (socket) {
      socket.on("unlikePostToClient", (newPost) => {
        dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
      });
    }
    return () => socket.off("unlikePostToClient");
  }, [socket, dispatch]);

  useEffect(() => {
    if (socket) {
      socket.on("createCommentToClient", (newPost) => {
        dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
      });
    }
    return () => socket.off("createCommentToClient");
  }, [socket, dispatch]);

  useEffect(() => {
    if (socket) {
      socket.on("deleteCommentToClient", (newPost) => {
        dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
      });
    }
    return () => socket.off("deleteCommentToClient");
  }, [socket, dispatch]);

  useEffect(() => {
    if (socket) {
      socket.on("addFriendToClient", (newUser) => {
        dispatch({ type: "AUTH", payload: { ...auth, user: newUser } });
      });
    }
    return () => socket.off("addFriendToClient");
  }, [socket, dispatch, auth]);

  useEffect(() => {
    if (socket) {
      socket.on("unFriendToClient", (newUser) => {
        dispatch({ type: "AUTH", payload: { ...auth, user: newUser } });
      });
    }
    return () => socket.off("unFriendToClient");
  }, [socket, dispatch, auth]);

  useEffect(() => {
    if (!socket) return;

    const handleCreateNotification = (msg) => {
      if (userInteracted) {
        const sound = new Audio(notify);
        sound.play().catch((err) => console.log("Failed to play sound:", err));
      }

      dispatch({
        type: NOTIFICATION_TYPES.CREATE_NOTIFICATIONS,
        payload: msg,
      });
    };

    const handleRemoveNotification = (msg) => {
      dispatch({
        type: NOTIFICATION_TYPES.REMOVE_NOTIFICATIONS,
        payload: msg,
      });
    };

    const handleDeleteAllNotifications = () => {
      dispatch({
        type: NOTIFICATION_TYPES.DELETE_NOTIFICATIONS,
        payload: [],
      });
    };

    // Listening for socket events
    socket.on("createNotificationToClient", handleCreateNotification);
    socket.on("removeNotificationToClient", handleRemoveNotification);
    socket.on("deleteAllNotificationsToClient", handleDeleteAllNotifications);

    return () => {
      // Cleaning up the listeners
      socket.off("createNotificationToClient", handleCreateNotification);
      socket.off("removeNotificationToClient", handleRemoveNotification);
      socket.off(
        "deleteAllNotificationsToClient",
        handleDeleteAllNotifications
      );
    };
  }, [socket, dispatch, userInteracted, auth]);

  useEffect(() => {
    if (socket) {
      socket.on("addMessageToClient", (msg) => {
        const sound = new Audio(notify);
        sound.play();
        dispatch({ type: MESS_TYPE.ADD_MESSAGE, payload: msg });
      });

      socket.on("deleteMessageToClient", (msgId) => {
        dispatch({
          type: MESS_TYPE.DELETE_MESSAGE,
          payload: { messageId: msgId._id, _id: msgId.recipient },
        });
      });

      socket.on("deleteAllMessagesToClient", (id) => {
        dispatch({
          type: MESS_TYPE.DELETE_MESSAGE,
          payload: { id }, // Dispatch action to remove all messages with this user ID
        });
      });
    }
    // Cleanup socket events when component unmounts
    return () => {
      socket.off("addMessageToClient");
      socket.off("deleteMessageToClient");
      socket.off("deleteAllMessagesToClient");
    };
  }, [socket, dispatch, auth]);
  return <></>;
};

export default SocketioClient;
