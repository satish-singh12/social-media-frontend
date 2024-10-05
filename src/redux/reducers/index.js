import { combineReducers } from "redux";
import auth from "./authReducers";
import alert from "./alertReducers";
import profile from "./profileReducers";
import homePost from "./postReducer";

export default combineReducers({
  auth,
  alert,
  profile,
  homePost,
});
