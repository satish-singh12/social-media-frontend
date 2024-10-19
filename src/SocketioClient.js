import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { POST_TYPES } from "./redux/actions/postActions";
import { NOTIFICATION_TYPES } from "./redux/actions/notificationActions";

const SocketioClient = () => {
  const auth = useSelector((state) => state.auth);
  const socket = useSelector((state) => state.socket);
  const dispatch = useDispatch();

  useEffect(() => {
    socket.emit("joinUser", auth.user._id);
  }, [socket, auth.user._id]);

  useEffect(() => {
    if (socket) {
      socket.on("likePostToClient", (newPost) => {
        console.log("Received new post after like:", newPost); // Debugging log
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
    socket.on("createCommentToClient", (newPost) => {
      dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
    });
    return () => socket.off("createCommentToClient");
  }, [socket, dispatch]);

  useEffect(() => {
    socket.on("deleteCommentToClient", (newPost) => {
      dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
    });
    return () => socket.off("deleteCommentToClient");
  }, [socket, dispatch]);

  useEffect(() => {
    socket.on("addFriendToClient", (newUser) => {
      dispatch({ type: "AUTH", payload: { ...auth, user: newUser } });
    });
    return () => socket.off("addFriendToClient");
  }, [socket, dispatch, auth]);

  useEffect(() => {
    socket.on("unFriendToClient", (newUser) => {
      dispatch({ type: "AUTH", payload: { ...auth, user: newUser } });
    });
    return () => socket.off("unFriendToClient");
  }, [socket, dispatch, auth]);

  useEffect(() => {
    socket.on("createNotificationToClient", (msg) => {
      dispatch({ type: NOTIFICATION_TYPES.CREATE_NOTIFICATIONS, payload: msg });
    });
    return () => socket.off("createNotificationToClient");
  }, [socket, dispatch, auth]);

  useEffect(() => {
    socket.on("removeNotificationToClient", (msg) => {
      dispatch({ type: NOTIFICATION_TYPES.CREATE_NOTIFICATIONS, payload: msg });
    });
    return () => socket.off("removeNotificationToClient");
  }, [socket, dispatch, auth]);
};

export default SocketioClient;
