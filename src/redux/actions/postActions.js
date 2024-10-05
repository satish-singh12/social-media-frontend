import { imageUpload } from "../../utils/imageUpload";
import { postDataApi } from "../../utils/fetchDataApi";

export const POST_TYPES = {
  CREATE_POST: "CREATE_POST",
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
          "posts",
          { content, images: media },
          auth.token
        );
        console.log(res);
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
