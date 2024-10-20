import { combineReducers } from "redux";
import auth from "./authReducers";
import alert from "./alertReducers";
import profile from "./profileReducers";
import homePost from "./postReducers";
import status from "./statusReducers";
import detailPost from "./detailPostReducers";
import socket from "./socketReducers";
import notification from "./notificationReducers";
import message from "./messageReducders";

export default combineReducers({
  auth,
  alert,
  profile,
  homePost,
  status,
  detailPost,
  socket,
  notification,
  message,
});
