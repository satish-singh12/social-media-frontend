import { imageUpload } from "../../utils/imageUpload";
import { getDataApi, postDataApi } from "../../utils/fetchDataApi";

export const POST_TYPES = {
  CREATE_POST: "CREATE_POST",
  GET_POST: "GET_POSTS",
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
        dispatch({ type: POST_TYPES.CREATE_POST, payload: res.data.newPosts });
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
    dispatch({ type: POST_TYPES.GET_POST, payload: res.data && res.data });
    dispatch({ type: POST_TYPES.LOADING_POST, payload: false });
  } catch (err) {
    dispatch({
      type: "ALERT",
      payload: { error: err.response.data.message },
    });
  }
};
