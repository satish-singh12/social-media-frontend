import { ALERT_TYPES } from "./alertActions";
import { getDataApi, patchDataApi } from "../../utils/fetchDataApi";
import { imageUpload } from "../../utils/imageUpload";
import axios from "axios";

export const PROFILE_TYPES = {
  LOADING: "LOADING",
  GET_USER: "GET_USER",
};

export const getProfileUsers =
  ({ users, id, auth }) =>
  async (dispatch) => {
    if (users.every((user) => user._id !== id)) {
      try {
        dispatch({
          type: "PROFILE_TYPES.LOADING",
          payload: { loading: true },
        });
        const res = await getDataApi(`user/${id}`, auth.token);
        console.log(res);
        dispatch({
          type: PROFILE_TYPES.GET_USER,
          payload: res && res.data,
        });
        dispatch({
          type: "PROFILE_TYPES.LOADING",
          payload: { loading: false },
        });
      } catch (err) {
        dispatch({
          type: "ALERT",
          payload: { error: err.response.data.message },
        });
      }
    }
  };

export const updatedProfile =
  ({ editData, avatar, auth }) =>
  async (dispatch) => {
    //   console.log({ editData, avatar });
    if (!editData.fullname)
      return dispatch({
        type: "ALERT",
        payload: { error: "Add your fullname" },
      });

    if (editData.fullname.length > 25)
      return dispatch({
        type: "ALERT",
        payload: {
          error: "Fullname should not greater than 25 characters..",
        },
      });

    if (editData.story.length > 200)
      return dispatch({
        type: "ALERT",
        payload: {
          error: "Story should not greater than 200 charaters..",
        },
      });

    try {
      let media;
      dispatch({ type: "ALERT", payload: { loading: true } });
      if (avatar) media = await imageUpload([avatar]);
      //console.log(media);
      console.log(avatar, media[0].secure_url);

      // const res = await patchDataApi(`user/${auth?.user._id},
      const res = await axios.patch(
        `http://localhost:5000/api/user/${auth?.user._id}`,
        {
          ...editData,
          avatar: media ? media[0].secure_url : auth.user.avatar,
        },
        {
          headers: { Authorization: auth.token },
        }
      );
      dispatch({
        type: "AUTH",
        payload: {
          auth,
          user: {
            ...auth.user,
            ...editData,
            avatar: avatar ? media[0].secure_url : auth.user.avatar,
          },
        },
      });
      if (res && res.data) {
        console.log(res);
        dispatch({ type: "ALERT", payload: { loading: false } });
      }

      //  const res = await patchDataApi(
      //     `user/${auth.user._id}`,
      //     {
      //       ...editData,
      //       avatar: avatar ? media[0].secure_url : auth.user.avatar,
      //     },
      //     auth.token
      //   );
      //   if (res && res.data) {
      //     console.log(res);
      //     dispatch({ type: "ALERT", payload: { loading: false } });
      //   }
    } catch (err) {
      dispatch({
        type: "ALERT",
        payload: { error: err.response.data.message },
      });
    }
  };
