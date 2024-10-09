import { combineReducers } from "redux";
import auth from "./authReducers";
import alert from "./alertReducers";
import profile from "./profileReducers";
import homePost from "./postReducers";
import status from "./statusReducers";

export default combineReducers({
  auth,
  alert,
  profile,
  homePost,
  status,
});
