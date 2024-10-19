import {
  getDataApi,
  postDataApi,
  patchDataApi,
  deleteDataApi,
} from "../../utils/fetchDataApi";
import { EditData, DeleteData } from "./alertActions";
import { POST_TYPES } from "./postActions";

export const createComment =
  ({ pos, newComment, auth, socket }) =>
  async (dispatch) => {
    //console.log(newComment);
    const newPost = { ...pos, comments: [...pos.comments, newComment] };
    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
    //console.log(newPost);
    try {
      const data = { ...newComment, postId: pos._id, postUserId: pos.user._id };
      const res = await postDataApi("comment", data, auth.token);
      socket.emit("createComment", newPost);
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

export const likeComment =
  ({ comment, pos, auth }) =>
  async (dispatch) => {
    // console.log({ comment, pos, auth });
    const newComment = { ...comment, likes: [...comment.likes, auth.user] };
    const newComments = EditData(pos.comments, comment._id, newComment);
    const newPost = { ...pos, comments: newComments };
    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
    try {
      const res = await patchDataApi(
        `comment/${comment._id}/like`,
        null,
        auth.token
      );
    } catch (err) {
      dispatch({
        type: "ALERT",
        payload: { error: err.response.data.message },
      });
    }
  };

export const unlikeComment =
  ({ comment, pos, auth }) =>
  async (dispatch) => {
    const newComment = {
      ...comment,
      likes: DeleteData(comment.likes, auth.user._id),
    };
    const newComments = EditData(pos.comments, comment._id, newComment);
    const newPost = { ...pos, comments: newComments };
    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
    try {
      const res = await patchDataApi(
        `comment/${comment._id}/unlike`,
        null,
        auth.token
      );
    } catch (err) {
      dispatch({
        type: "ALERT",
        payload: { error: err.response.data.message },
      });
    }
  };

export const deleteComment =
  ({ comment, pos, auth, socket }) =>
  async (dispatch) => {
    const deleteArr = [
      ...pos.comments.filter((cmt) => cmt.reply === comment._id),
      comment,
    ];

    const newPost = {
      ...pos,
      comments: pos.comments.filter(
        (cmt) => cmt !== deleteArr.find((delarr) => cmt._id === delarr._id)
      ),
    };

    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });

    try {
      for (const item of deleteArr) {
        await deleteDataApi(`comment/${item._id}`, auth.token);
      }
      socket.emit("deleteComment", newPost);
    } catch (err) {
      dispatch({
        type: "ALERT",
        payload: { error: err.response.data.message },
      });
    }
  };
