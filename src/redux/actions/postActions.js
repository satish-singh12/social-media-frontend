import { imageUpload } from "../../utils/imageUpload";
import {
  getDataApi,
  postDataApi,
  patchDataApi,
  deleteDataApi,
} from "../../utils/fetchDataApi";

export const POST_TYPES = {
  CREATE_POST: "CREATE_POST",
  GET_POSTS: "GET_POSTS",
  UPDATE_POST: "UPDATE_POST",
  LOADING_POST: "LOADING_POST",
  GET_POST: "GET_POST",
  DELETE_POST: "DELETE_POST",
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

    if (res && res.data) {
      dispatch({
        type: POST_TYPES.GET_POSTS,
        payload: res && res.data && res.data,
      });
    }
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

export const getPostSingle =
  ({ detailPost, auth, id }) =>
  async (dispatch) => {
    if (detailPost.every((item) => item._id !== id)) {
      try {
        const res = await getDataApi(`post/${id}`, auth.token);
        if (res && res.data && res.data.post) {
          dispatch({ type: POST_TYPES.GET_POST, payload: res.data.post });
        }
      } catch (err) {
        dispatch({
          type: "ALERT",
          payload: { error: err.response.data.message },
        });
      }
    }
  };

export const savedPost =
  ({ pos, auth }) =>
  async (dispatch) => {
    const newUser = { ...auth.user, saved: [...auth.user.saved, pos._id] };

    dispatch({ type: "AUTH", payload: { ...auth, user: newUser } });
    try {
      const res = await patchDataApi(`save/${pos._id}`, null, auth.token);
    } catch (err) {
      dispatch({
        type: "ALERT",
        payload: { error: err.response.data.message },
      });
    }
  };

export const unSavedPost =
  ({ pos, auth }) =>
  async (dispatch) => {
    const newUser = {
      ...auth.user,
      saved: auth.user.saved.filter((id) => id !== pos._id),
    };

    dispatch({ type: "AUTH", payload: { ...auth, user: newUser } });
    try {
      const res = await patchDataApi(`unsave/${pos._id}`, null, auth.token);
    } catch (err) {
      dispatch({
        type: "ALERT",
        payload: { error: err.response.data.message },
      });
    }
  };

export const deletePost =
  ({ pos, auth }) =>
  async (dispatch) => {
    dispatch({ type: POST_TYPES.DELETE_POST, payload: pos });
    try {
      await deleteDataApi(`post/${pos._id}`, auth.token);
    } catch (err) {
      dispatch({
        type: "ALERT",
        payload: { error: err.response.data.message },
      });
    }
  };
