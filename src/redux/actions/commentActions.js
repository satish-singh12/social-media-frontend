import {
  getDataApi,
  postDataApi,
  patchDataApi,
} from "../../utils/fetchDataApi";
import { POST_TYPES } from "./postActions";

export const createComment =
  ({ pos, newComment, auth }) =>
  async (dispatch) => {
    const newPost = { ...pos, comments: [...pos.comments, newComment] };
    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
    //console.log(newPost);
    try {
      const data = { ...newComment, postId: pos._id };
      const res = await postDataApi("comment", data, auth.token);
      console.log(res);
    } catch (err) {
      dispatch({
        type: "ALERT",
        payload: { error: err.response.data.message },
      });
    }
  };
