import { imageUpload } from "../../utils/imageUpload";
import {
  getDataApi,
  postDataApi,
  patchDataApi,
  deleteDataApi,
} from "../../utils/fetchDataApi";
import { createNotification, removeNotification } from "./notificationActions";

export const POST_TYPES = {
  CREATE_POST: "CREATE_POST",
  GET_POSTS: "GET_POSTS",
  UPDATE_POST: "UPDATE_POST",
  LOADING_POST: "LOADING_POST",
  GET_POST: "GET_POST",
  DELETE_POST: "DELETE_POST",
};

export const createPost =
  ({ content, images, auth, socket }) =>
  async (dispatch) => {
    let media = [];
    try {
      dispatch({ type: "ALERT", payload: { loading: true } });
      // If there are images, upload them; otherwise, continue with text content only
      if (images.length > 0) {
        media = await imageUpload(images);
      }

      const res = await postDataApi(
        `posts/${auth.user._id}`,
        { content, images: media },
        auth.token
      );
      if (!res || !res.data) {
        throw new Error("No data returned from API");
      }

      dispatch({
        type: POST_TYPES.CREATE_POST,
        payload: { ...res.data.newPosts, user: auth.user },
      });
      dispatch({ type: "ALERT", payload: { loading: false } });

      //notification
      const msg = {
        id: res.data.newPosts._id,
        text: "added a new post",
        url: `/post/${res.data.newPosts._id}`,
        recipients: res.data.newPosts.user.friends,
        content,
        image: media.length > 0 ? media[0].secure_url : "", // Set image only if present
      };
      dispatch(createNotification({ msg, auth, socket }));
    } catch (err) {
      dispatch({
        type: "ALERT",
        payload: { error: err.response?.data?.message || err.message },
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

    // Check if both content and images remain unchanged
    if (
      status.content === content &&
      newImgUrl.length === 0 &&
      oldImgUrl.length === status.images.length
    )
      return;

    try {
      dispatch({ type: "ALERT", payload: { loading: true } });

      // Upload new images if present
      if (newImgUrl.length > 0) {
        media = await imageUpload(newImgUrl);
      }

      const res = await patchDataApi(
        `post/${status._id}`,
        {
          content: content || status.content, // Keep current content if no new content provided
          images: newImgUrl.length > 0 ? [...oldImgUrl, ...media] : oldImgUrl, // Keep existing images if no new ones
        },
        auth.token
      );

      if (res && res.data && res.data.newPost) {
        dispatch({
          type: "ALERT",
          payload: { success: res.data.message },
        });
        dispatch({
          type: POST_TYPES.UPDATE_POST,
          payload: res.data.newPost,
        });
      }

      dispatch({ type: "ALERT", payload: { loading: false } });
    } catch (err) {
      dispatch({
        type: "ALERT",
        payload: { error: err.response?.data?.message || err.message },
      });
    }
  };

export const likePost =
  ({ pos, auth, socket }) =>
  async (dispatch) => {
    const newPost = { ...pos, likes: [...pos.likes, auth.user] };
    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
    socket.emit("likePost", newPost);

    try {
      await patchDataApi(`post/${pos._id}/like`, null, auth.token);
      const msg = {
        id: auth.user._id,
        text: "like the post",
        url: `/post/${pos._id}`,
        recipients: [pos.user._id],
        content: pos.content,
        image: pos.images[0].secure_url,
      };
      dispatch(createNotification({ msg, auth, socket }));
    } catch (err) {
      dispatch({
        type: "ALERT",
        payload: { error: err.response.data.message },
      });
    }
  };

export const unlikePost =
  ({ pos, auth, socket }) =>
  async (dispatch) => {
    const newPost = {
      ...pos,
      likes: pos.likes.filter((like) => like._id !== auth.user._id),
    };
    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
    socket.emit("unlikePost", newPost);
    try {
      await patchDataApi(`post/${pos._id}/unlike`, null, auth.token);
      const msg = {
        id: auth.user._id,
        text: "unlike the post",
        url: `/post/${pos._id}`,
        recipients: [pos.user._id],
      };
      dispatch(removeNotification({ msg, auth, socket }));
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
      await patchDataApi(`save/${pos._id}`, null, auth.token);
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
      await patchDataApi(`unsave/${pos._id}`, null, auth.token);
    } catch (err) {
      dispatch({
        type: "ALERT",
        payload: { error: err.response.data.message },
      });
    }
  };

export const deletePost =
  ({ pos, auth, socket }) =>
  async (dispatch) => {
    dispatch({ type: POST_TYPES.DELETE_POST, payload: pos });
    try {
      const res = await deleteDataApi(`post/${pos._id}`, auth.token);
      const msg = {
        id: pos._id,
        text: "post deleted",
        recipients: res.data.newPosts.user.friends,
        url: `/post/${pos._id}`,
      };
      dispatch(removeNotification({ msg, auth, socket }));
    } catch (err) {
      dispatch({
        type: "ALERT",
        payload: { error: err.response.data.message },
      });
    }
  };
