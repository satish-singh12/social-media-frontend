import { imageUpload } from "../../utils/imageUpload";
import {
  getDataApi,
  postDataApi,
  patchDataApi,
} from "../../utils/fetchDataApi";

export const POST_TYPES = {
  CREATE_POST: "CREATE_POST",
  GET_POST: "GET_POSTS",
  UPDATE_POST: "UPDATE_POST",
  LOADING_POST: "LOADING_POST",
};

export const createPost =
  ({ content, images, auth }) =>
  async (dispatch) => {
    let media = [];
    try {
      dispatch({ type: "ALERT", payload: { loading: true } });
      if (images.length > 0) {
        media = await imageUpload(images);

        const res = await postDataApi(
          `posts/${auth.user._id}`,
          { content, images: media },
          auth.token
        );

        if (res && res.data && res.data.newPost) {
          dispatch({
            type: POST_TYPES.CREATE_POST,
            payload: { ...res.data.newPosts, user: auth.user },
          });
        }
        dispatch({ type: "ALERT", payload: { loading: false } });
      }
    } catch (err) {
      dispatch({
        type: "ALERT",
        payload: { error: err.response.data.message },
      });
    }
  };

export const getPost = (token) => async (dispatch) => {
  try {
    dispatch({ type: POST_TYPES.LOADING_POST, payload: true });
    const res = await getDataApi("posts", token);
    // Safely handle res.data
    if (res && res.data) {
      dispatch({ type: POST_TYPES.GET_POST, payload: res.data });
    }
    // dispatch({ type: POST_TYPES.GET_POST, payload: res.data && res.data });
    dispatch({ type: POST_TYPES.LOADING_POST, payload: false });
  } catch (err) {
    dispatch({
      type: "ALERT",
      payload: { error: err.response.data.message },
    });
  }
};

export const updatePost =
  ({ content, images, auth, status }) =>
  async (dispatch) => {
    let media = [];
    let newImgUrl = images?.filter((img) => !img.secure_url);
    let oldImgUrl = images?.filter((img) => img.secure_url);
    if (
      status.content === content &&
      newImgUrl.length === 0 &&
      oldImgUrl.length === status.images.length
    )
      return;
    try {
      dispatch({ type: "ALERT", payload: { loading: true } });
      if (newImgUrl.length > 0) {
        media = await imageUpload(newImgUrl);

        const res = await patchDataApi(
          `post/${status._id}`,
          { content, images: [...oldImgUrl, ...media] },
          auth.token
        );
        if (res && res.data && res.data.newPosts) {
          dispatch({
            type: "ALERT",
            payload: { success: res.data.message },
          });
          dispatch({
            type: POST_TYPES.UPDATE_POST,
            payload: res.data.newPosts,
          });
        }
      }
      dispatch({ type: "ALERT", payload: { loading: false } });
    } catch (err) {
      dispatch({
        type: "ALERT",
        payload: { error: err.response.data.message },
      });
    }
  };

export const likePost =
  ({ pos, auth }) =>
  async (dispatch) => {
    const newPost = { ...pos, likes: [...pos.likes, auth.user] };
    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
    try {
      const res = await patchDataApi(`post/${pos._id}/like`, null, auth.token);
      console.log("res", res);
    } catch (err) {
      dispatch({
        type: "ALERT",
        payload: { error: err.response.data.message },
      });
    }
  };

export const unlikePost =
  ({ pos, auth }) =>
  async (dispatch) => {
    const newPost = {
      ...pos,
      likes: pos.likes.filter((like) => like._id !== auth.user._id),
    };
    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });

    try {
      const res = await patchDataApi(
        `post/${pos._id}/unlike`,
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
