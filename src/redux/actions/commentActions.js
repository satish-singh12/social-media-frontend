import {
  getDataApi,
  postDataApi,
  patchDataApi,
} from "../../utils/fetchDataApi";
import { EditData } from "./alertActions";
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

export const updateComment =
  ({ comment, content, pos, auth }) =>
  async (dispatch) => {
    const newComment = EditData(pos.comments, comment._id, {
      ...comment,
      content,
    });

    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newComment });
    try {
      const res = await patchDataApi(
        `comment/${comment._id}`,
        { content },
        auth.token
      );
    } catch (err) {
      dispatch({
        type: "ALERT",
        payload: { error: err.response.data.message },
      });
    }
  };
