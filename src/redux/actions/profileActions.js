import { EditData, DeleteData } from "./alertActions";
import { ALERT_TYPES } from "./alertActions";
import { getDataApi, patchDataApi } from "../../utils/fetchDataApi";
import { imageUpload } from "../../utils/imageUpload";
import axios from "axios";

export const PROFILE_TYPES = {
  LOADING: "LOADING",
  GET_USER: "GET_USER",
  FRIEND: "FRIEND",
  UNFRIEND: "UNFRIEND",
  GET_IDS: "GET_IDS",
  USERPOSTS: "USERPOSTS",
};

export const getProfileUsersData =
  ({ users, id, auth }) =>
  async (dispatch) => {
    dispatch({ type: PROFILE_TYPES.GET_IDS, payload: id });
    // console.log({ users, id, auth });
    try {
      dispatch({
        type: PROFILE_TYPES.LOADING,
        payload: { loading: true },
      });
      const res = await getDataApi(`user/${id}`, auth.token);
      const res1 = await getDataApi(`userposts/${id}`, auth.token);
      const user = res;
      const posts = res1;

      dispatch({
        type: PROFILE_TYPES.GET_USER,
        payload: user.data, //user data
      });

      dispatch({
        type: PROFILE_TYPES.USERPOSTS,
        payload: { ...posts.data, _id: id, result: posts.result },
      });

      dispatch({
        type: PROFILE_TYPES.LOADING,
        payload: { loading: false },
      });
    } catch (err) {
      dispatch({
        type: "ALERT",
        payload: { error: err.response.data.message },
      });
    }
  };

export const updatedProfile =
  ({ editData, avatar, auth }) =>
  async (dispatch) => {
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
      console.log(avatar, media[0].secure_url);

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
            avatar: avatar ? media[0].secure_url : auth?.user?.avatar,
          },
        },
      });
      if (res && res.data) {
        console.log(res);
        dispatch({ type: "ALERT", payload: { loading: false } });
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "An error occurred";
      dispatch({
        type: "ALERT",
        payload: { error: errorMessage },
      });
    }
  };

export const addFriends =
  ({ users, user, auth }) =>
  async (dispatch) => {
    const newUser = { ...users, friends: [...user.friends, auth.user] };

    dispatch({
      type: PROFILE_TYPES.FRIEND,
      payload: newUser,
    });

    dispatch({
      type: "AUTH",
      payload: {
        ...auth,
        user: { ...auth.user, following: [...auth.user.following, newUser] },
      },
    });
    try {
      await patchDataApi(`user/${user._id}/friend`, null, auth.token);
    } catch (err) {
      dispatch({
        type: "ALERT",
        payload: { error: err.response.data.message },
      });
    }
  };

export const unFriends =
  ({ users, user, auth }) =>
  async (dispatch) => {
    const newUser = {
      ...users,
      friends: DeleteData(user.friends, auth.user._id),
    };
    dispatch({
      type: PROFILE_TYPES.UNFRIEND,
      payload: newUser,
    });

    dispatch({
      type: "AUTH",
      payload: {
        ...auth,
        user: {
          ...auth.user,
          following: DeleteData(auth.user.following, newUser._id),
        },
      },
    });
    try {
      await patchDataApi(`user/${user._id}/unfriend`, null, auth.token);
    } catch (err) {
      dispatch({
        type: "ALERT",
        payload: { error: err.response.data.message },
      });
    }
  };
